// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Apartna
 * @dev list, rent and buy apartments
 */
contract Apartna {
    // listed apartments
    uint256 listedApartments = 0;
    // rented apartments
    uint256 rentedApartments = 0;
    // cUsdToken Address
    address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    // offers made
    uint256 offersMade = 0;
    // discount percentage
    uint256 discountPercentage = 0;
    // nights spent
    uint256 nightsSpent = 0;

    struct ListApartment {
        address payable owner;
        string name;
        string image;
        string description;
        string[] details;
        string[] facilities;
        string location;
        uint256 price;
    }

    struct Availability {
        uint256 _id; // the apartment
        bool allowRent;
        bool allowPurchase;
        bool rented;
        bool sold;
    }

    struct RentApartment {
        uint256 apartmentId;
        address payable landlord;
        address payable tenant;
        uint256 nights;
        string name;
        string email;
        uint256 number;
    }

    struct OffersMade {
        uint256 apartmentId;
        address payable bidder;
        uint256 amount;
        string message;
        bool approved;
        bool declined;
    }

    event ListedAnApartment();
    event updatedAllowPurchase();
    event updatedPrice();
    event updatedImage();
    event deletedListedApartment();
    event madeAnOffer();
    event approvedOffer();
    event declinedOffer();
    event discountedPrice();
    event updatedDiscountedPrice();
    event endedDiscount();
    event NightsLeft();
    event rentedAnApartment();
    event terminatedRent();

    mapping(uint256 => ListApartment) internal listApartment;
    mapping(uint256 => RentApartment) internal rentApartment;
    mapping(uint256 => Availability) internal availability;
    mapping(uint256 => bool) internal _exists;
    mapping(uint256 => bool) internal _madeOffer;
    mapping(uint256 => OffersMade) internal _offersMade;
    mapping(uint256 => bool) internal _discounted;

    // Modifier to check that the caller is the owner of apartment
    modifier onlyOwner(uint256 _index) {
        require(msg.sender == listApartment[_index].owner, "Not owner");
        _;
    }

    // Modifier to check that the apartment exists
    modifier exists(uint256 _index) {
        require(_exists[_index], "Apartment does not exist");
        _;
    }

    // Modifier to check that the apartment has been rented or sold
    modifier _availability(uint256 _index) {
        Availability storage available = availability[_index];
        require(available._id == _index, "Availability does not exist");
        require(!available.rented, "Apartment already rented");
        require(!available.sold, "Apartment already sold");
        _;
    }

    // Modifier to check that an offer was made
    modifier madeOffer(uint256 _offerId) {
        require(_madeOffer[_offerId], "An offer was not made");
        _;
    }

    // Modifier to check if the price has been discounted
    modifier discounted(uint256 _index) {
        require(_discounted[_index], "Price not discounted");
        _;
    }

    // constructor to check eth value is more than 1
    constructor() payable {
        require(
            msg.value > 1 ether,
            "More than 1 ether initial funding is required"
        );
    }

    /**
     * @dev List an apartment
     * @param _name: apartment name
     * @param _image: image of the apartment
     * @param _description: description of the apartment
     * @param _details: array of details
     * @param _facilities: array of facilities
     * @param _location: location of the apartment
     * @param _price: price of rent per night
     * @param _allowPurchase: bool to allow purchase
     */
    function listAnApartment(
        string memory _name,
        string memory _image,
        string memory _description,
        string[] memory _details,
        string[] memory _facilities,
        string memory _location,
        uint256 _price,
        bool _allowPurchase
    ) public {
        listApartment[listedApartments] = ListApartment(
            payable(msg.sender),
            _name,
            _image,
            _description,
            _details,
            _facilities,
            _location,
            _price
        );

        // set availability
        availability[listedApartments] = Availability(
            listedApartments,
            true, // Allow rent by default
            _allowPurchase,
            false, // Not rented
            false // Not sold
        );

        // apartment exists
        _exists[listedApartments] = true;
        listedApartments++;

        emit ListedAnApartment();
    }

    /**
     * @dev Return listed apartment details
     * @param _index: the index of the listed apartment
     * @return description
     * @return details
     * @return facilities
     * @return image
     * @return location
     * @return name
     * @return payable(address)
     * @return price
     */
    function getListedApartment(uint _index)
        public
        view
        exists(_index)
        returns (
            string memory description,
            string[] memory details,
            string[] memory facilities,
            string memory image,
            string memory location,
            string memory name,
            address payable,
            uint256 price
        )
    {
        ListApartment storage apartment = listApartment[_index];
        return (
            apartment.description,
            apartment.details,
            apartment.facilities,
            apartment.image,
            apartment.location,
            apartment.name,
            apartment.owner,
            apartment.price
        );
    }

    /**
     * @dev Returns the number of listed apartments
     * @return _listedApartments
     */
    function NumberOfListedApartments()
        public
        view
        returns (uint256 _listedApartments)
    {
        return listedApartments;
    }

    /**
     * @dev Returns the availability of an apartment
     * @param _index: the desired apartment
     * @return id
     * @return allowPurchase
     * @return allowRent
     * @return rented
     * @return sold
     */
    function getAvailablity(uint256 _index)
        public
        view
        returns (
            uint256 id,
            bool allowPurchase,
            bool allowRent,
            bool rented,
            bool sold
        )
    {
        Availability storage available = availability[_index];
        require(available._id == _index, "Availability does not exist");
        return (
            available._id,
            available.allowPurchase,
            available.allowRent,
            available.rented,
            available.sold
        );
    }

    /**
     * @dev Allow users to purchase the apartment or not
     * @param _index: the index of the apartment to update, _available: the bool
     */
    function updateAllowPurchase(uint256 _index)
        public
        _availability(_index)
        onlyOwner(_index)
    {
        Availability storage available = availability[_index];
        require(available._id == _index, "Availability does not exist");
        available.allowPurchase = !available.allowPurchase;

        emit updatedAllowPurchase();
    }

    /**
     * @dev Users can only bid to purchase aparment and cannot rent
     * @param _index: the desired apartment
     */
    function purchaseOnly(uint256 _index)
        public
        _availability(_index)
        onlyOwner(_index)
    {
        Availability storage available = availability[_index];
        require(available._id == _index, "Availability does not exist");
        if (available.allowRent) {
            available.allowRent = false;
            available.allowPurchase = true;
        }
    }

    /**
     * @dev Update the price of the listed apartment
     * @param _index: the apartment to update, _price: the new price
     */
    function updatePrice(uint256 _index, uint256 _price)
        public
        exists(_index)
        _availability(_index)
        onlyOwner(_index)
    {
        // Can't update discounted price, end discount first
        require(
            !_discounted[_index],
            "Can't update disocunted price, end discount first"
        );
        listApartment[_index].price = _price;

        emit updatedPrice();
    }

    /**
     * @dev Update the image of an apartment
     * @param _index: the apartment to update, _image: the new image
     */
    function updateImage(uint256 _index, string memory _image)
        public
        exists(_index)
        _availability(_index)
        onlyOwner(_index)
    {
        listApartment[_index].image = _image;

        emit updatedImage();
    }

    /**
     * @dev Delete a listed apartment
     * @param _index: the apartment to delete
     */
    function deleteListedApartment(uint256 _index)
        public
        exists(_index)
        _availability(_index)
        onlyOwner(_index)
    {
        _exists[_index] = false;
        delete listApartment[_index];
        require(
            availability[_index]._id == _index,
            "Availability does not exist"
        );
        delete availability[_index];
        // reduce the number of listed apartments
        listedApartments--;

        emit deletedListedApartment();
    }

    /**
     * @dev Make an offer to purchase the apartment
     * @param _index: the desired apartment
     * @param _amt: the amount of token
     * @param _message: message for the owner
     */
    function makeOffer(
        uint256 _index,
        uint256 _amt,
        string memory _message
    ) public payable exists(_index) _availability(_index) {
        ListApartment storage apartment = listApartment[_index];
        Availability storage available = availability[_index];
        // Check that availability is valid
        require(available._id == _index, "Availability does not exist");
        // Owner can't make an offer
        require(apartment.owner != msg.sender, "Owner can't make offer");
        // Check availability for purchase
        require(available.allowPurchase, "Not available for purchase");
        // Check value of token
        require(_amt > 0, "Can't make an offer with 0 token");

        _offersMade[offersMade] = OffersMade(
            _index,
            payable(msg.sender),
            _amt,
            _message,
            false,
            false
        );

        // Transfer tokens to contract
        bool success = IERC20(cUsdTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amt
        );
        require(success, "Failed to make offer");
        // An offer was made
        _madeOffer[offersMade] = true;
        // increment the number of offers
        offersMade++;

        emit madeAnOffer();
    }

    /**
     * @dev Approve an offer made on the apartment
     * @param _offerId: the desired offer
     */
    function approveOffer(uint256 _offerId) public payable madeOffer(_offerId) {
        OffersMade storage offerMade = _offersMade[_offerId];
        ListApartment storage apartment = listApartment[offerMade.apartmentId];
        Availability storage available = availability[offerMade.apartmentId];
        // Rented or Sold
        if (available.rented == true) {
            revert("Apartment already rented");
        }
        if (available.sold == true) {
            revert("Apartment already sold");
        }
        // Allow only the owner
        require(apartment.owner == msg.sender, "Not the Owner");
        // Offer already approved
        require(offerMade.approved, "Offer already approved");
        // Check that offer was not declined
        require(!offerMade.declined, "Offer declined, can't approve");
        require(available.allowPurchase, "Not available for purchase");
        bool received = IERC20(cUsdTokenAddress).transfer(
            apartment.owner,
            offerMade.amount
        );
        require(received, "Failed to approve offer");
        // approved
        offerMade.approved = true;
        // transfer ownership
        apartment.owner = offerMade.bidder;
        // apartment purchased
        available.allowPurchase = false;
        available.sold = true;

        emit approvedOffer();
    }

    /**
     * @dev Decline an offer made
     * @param _offerId: the offer
     */
    function declineOffer(uint256 _offerId) public payable madeOffer(_offerId) {
        OffersMade storage offerMade = _offersMade[_offerId];
        Availability storage available = availability[offerMade.apartmentId];
        // Rented or Sold
        if (available.rented == true) {
            revert("Apartment already rented");
        }
        if (available.sold == true) {
            revert("Apartment already sold");
        }
        // Offer not approved
        require(!offerMade.approved, "Offer already approved, can't decline");
        // Offer already declined
        require(offerMade.declined, "Offer already declined");
        // Allow only the owner
        require(
            listApartment[offerMade.apartmentId].owner == msg.sender,
            "Not the Owner"
        );
        // Declined the offer
        offerMade.declined = true;
        // Transfer back the amount
        bool success = IERC20(cUsdTokenAddress).transfer(
            offerMade.bidder,
            offerMade.amount
        );
        require(success, "Failed to decline offer");

        emit declinedOffer();
    }

    /**
     * @dev Return the offer made
     * @param _offerId: the desired offer
     * @return amt - the amount of ETH
     * @return apartmentId = the apartment
     * @return approved - approved the offer(bool)
     * @return bidder - the address of the bidder
     * @return declined - declined the offer(bool)
     * @return message - message from the bidder
     */
    function getOfferMade(uint256 _offerId)
        public
        view
        madeOffer(_offerId)
        returns (
            uint256 amt,
            uint256 apartmentId,
            bool approved,
            address bidder,
            bool declined,
            string memory message
        )
    {
        OffersMade storage offerMade = _offersMade[_offerId];
        return (
            offerMade.amount,
            offerMade.apartmentId,
            offerMade.approved,
            offerMade.bidder,
            offerMade.declined,
            offerMade.message
        );
    }

    /**
     * @dev Returns the number of offers made
     * @return _offers - the number of offers
     */
    function numberOfOffers() public view returns (uint256 _offers) {
        return offersMade;
    }

    /**
     * @dev Discount the price of an apartment
     * @param _index: the apartment to discount price, _discount: the percentage
     */
    function discountPrice(uint256 _index, uint256 _discount)
        public
        exists(_index)
        _availability(_index)
        onlyOwner(_index)
    {
        ListApartment storage apartment = listApartment[_index];
        discountPercentage = _discount;
        apartment.price =
            apartment.price -
            ((apartment.price / 100) * discountPercentage);
        _discounted[_index] = true;

        emit discountedPrice();
    }

    /**
     * @dev Update discount percentage
     * @param _index: the apartment to update discount price
     * @param _newDiscount: the new discount percentage
     */
    function updateDiscountPrice(uint256 _index, uint256 _newDiscount)
        public
        _availability(_index)
        discounted(_index)
        onlyOwner(_index)
    {
        ListApartment storage apartment = listApartment[_index];
        // convert to original price
        apartment.price = (apartment.price / (100 - discountPercentage)) * 100;
        // discount the price with the new discount percentage
        discountPercentage = _newDiscount;
        apartment.price =
            apartment.price -
            ((apartment.price / 100) * discountPercentage);

        emit updatedDiscountedPrice();
    }

    /**
     * @dev End the discount
     * @param _index: the apartment price
     */
    function endDiscount(uint256 _index)
        public
        _availability(_index)
        discounted(_index)
        onlyOwner(_index)
    {
        _discounted[_index] = false;
        // set the price to the original
        ListApartment storage apartment = listApartment[_index];
        apartment.price = (apartment.price / (100 - discountPercentage)) * 100;
        discountPercentage = 0;

        emit endedDiscount();
    }

    /**
     * @dev Returns the discount percentage
     * @return _percent - the discount percentage
     */
    function getDiscountPercent() public view returns (uint256 _percent) {
        return discountPercentage;
    }

    /**
     * @dev Rent an apartment
     * @param _index: the apartment to rent
     * @param _nights: the apartment to rent
     * @param _name: the apartment to rent
     * @param _email: the apartment to rent
     * @param _number: the apartment to rent
     */
    function rentAnApartment(
        uint256 _index,
        uint256 _nights,
        string memory _name,
        string memory _email,
        uint256 _number
    ) public payable _availability(_index) exists(_index) {
        ListApartment storage apartment = listApartment[_index];
        Availability storage available = availability[_index];
        require(available._id == _index, "Availability does not exist");
        // check availability for rent
        require(available.allowRent, "This apartment is not available");
        // Check ownership
        require(msg.sender != apartment.owner, "Owner cannot rent");

        rentApartment[rentedApartments] = RentApartment({
            apartmentId: _index,
            landlord: apartment.owner,
            tenant: payable(msg.sender),
            nights: _nights,
            name: _name,
            email: _email,
            number: _number
        });

        // make payment
        bool paid = IERC20(cUsdTokenAddress).transferFrom(
            payable(msg.sender),
            apartment.owner,
            _nights * apartment.price
        );
        require(paid, "Rent not paid");
        // set to unavailable for rent after payement
        available.allowRent = false;
        // apartment rented
        available.rented = true;
        // increment the number of rented apartments
        rentedApartments++;

        emit rentedAnApartment();
    }

    /**
     * @dev Sets the number of nights left for tenant
     * @param _index: the rented apartment, _nightsSpent:
     */
    function setNightsLeft(uint256 _index, uint256 _nightsSpent) public {
        RentApartment storage rent = rentApartment[_index];
        Availability storage available = availability[rent.apartmentId];
        require(available.rented, "Not rented");
        nightsSpent = rent.nights - _nightsSpent;

        emit NightsLeft();
    }

    /**
     * @dev Returns the number of nights left for tenant
     */
    function getNightsLeft() public view returns (uint) {
        return nightsSpent;
    }

    /**
     * @dev Return a rented apartment details
     * @param _index: the desired rented apartment
     */
    function getRentedApartment(uint256 _index)
        public
        view
        returns (
            uint256 apartmentId,
            string memory email,
            address landlord,
            string memory name,
            uint256 nights,
            uint256 number,
            address tenant
        )
    {
        RentApartment storage rent = rentApartment[_index];
        return (
            rent.apartmentId,
            rent.email,
            rent.landlord,
            rent.name,
            rent.nights,
            rent.number,
            rent.tenant
        );
    }

    /**
     * @dev Terminate rent agreement with charges of 15%
     * @param _index: the rented apartment
     */
    function terminateRent(uint256 _index) public payable {
        RentApartment storage rent = rentApartment[_index];
        ListApartment storage apartment = listApartment[rent.apartmentId];
        Availability storage available = availability[rent.apartmentId];
        // Aartment is rented
        require(available.rented, "Not rented");
        // Only landlord
        require(rent.landlord == msg.sender, "Not landlord, can't terminate");
        // Set availability
        available.allowRent = true;
        available.rented = false;
        // transfer tokens if there are nights left with 15% charges
        if (nightsSpent > 0) {
            bool success = IERC20(cUsdTokenAddress).transferFrom(
                payable(msg.sender),
                rent.tenant,
                ((nightsSpent * apartment.price) -
                    (((nightsSpent * apartment.price) / 100) * 15))
            );
            require(success, "Failed to terminate");
        }

        emit terminatedRent();
    }
}
