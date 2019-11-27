// on document load
$(document).ready(function() {
    getListings();
    $(`#addButtonSale`).on('click', addListing)
    $(`.outputSale`).on(`click`, `.delete`, deleteListing);
    $(`#forRent`).on('click', getListingsRent)
    $(`#forSale`).on('click', getListingsSale)
    $(`#showAll`).on('click', getListings)
});

function addListing() {
    let objectToSend = {
        cost: $(`#costIn`).val(),
        sqft: $(`#squareFootageIn`).val(),
        type: chooseSaleRent($(`#saleOrRent`).val()),
        city: $(`#cityIn`).val(),
        image_path: chooseImage($(`#images`).val())
    }
    $.ajax({
        method: 'POST',
        url: '/listings',
        data: objectToSend
    }).then(function(response){
        console.log('in /listings POST');
        getListings();
        $(`#squareFootageIn`).val('');
        $(`#costIn`).val('');
        $(`#typeIn`).val('');
        $(`#cityIn`).val('');
    }).catch(function(error){
        alert('error adding listing');
        console.log(error);
    })
}

function deleteListing(){
    let id = $(this).closest(`span`).data(`id`);
    let popup = confirm(`Delete this listing?`);
    if(popup == true){
        $.ajax({
            method: `DELETE`,
            url: `/listings/${id}`
        }).then(function(response){
            console.log(`in /${id} DELETE`);
            getListings();
        }).catch(function(error){
        alert(`something went wrong`);
        console.log(error)
        });
    }
}

function getFeaturedHomes(){
    $.ajax({
        method: `GET`,
        url: `/listings/featured`
    }).then(function(response){
        console.log('in /featured GET');
        renderFeaturedHomes(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function getFeaturedHomesRent(){
    $.ajax({
        method: `GET`,
        url: `/listings/featuredrent`
    }).then(function(response){
        console.log('in /featured GET');
        renderFeaturedHomes(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function getFeaturedHomesSale(){
    $.ajax({
        method: `GET`,
        url: `/listings/featuredsale`
    }).then(function(response){
        console.log('in /featured GET');
        renderFeaturedHomes(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function getListings(){
    $.ajax({
        method: `GET`,
        url: `/listings`
    }).then(function(response){
        console.log('in /listings GET');
        getFeaturedHomes();
        renderListings(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function getListingsRent(){
    $.ajax({
        method: `GET`,
        url: `/listings/rent`
    }).then(function(response){
        console.log('in /listings/rent GET');
        getFeaturedHomesRent();
        renderListings(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function getListingsSale(){
    $.ajax({
        method: `GET`,
        url: `/listings/sale`
    }).then(function(response){
        console.log('in /listings/sale GET');
        getFeaturedHomesSale();
        renderListings(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function renderFeaturedHomes(listing){
    $(`#featuredOut`).empty();
    for(let i=0; i<listing.length; i++) {
        let house = listing[i]
        let $span = $(`<span></span>`);
        $span.data(`id`, house.id);
        $span.append(`<div><img src="./images/${house.image_path}" style="width: 200px;height: 125px;" /></div>`);
        $span.append(`<div class="center">${house.cost}</div>`);
        $span.append(`<div class="center">${house.sqft}</div>`);
        $span.append(`<div class="center">${house.city}</div>`);
        $span.append(`<div class="center">${house.type}</div>`);
        $(`#featuredOut`).append($span);
    }
}

function renderListings(listing){
    $(`.outputSale`).empty();
    for(let i=0; i<listing.length; i++) {
        let house = listing[i]
        let $span = $(`<span></span>`);
        $span.data(`id`, house.id);
        $span.append(`<div><img src="./images/${house.image_path}" style="width: 200px;height: 125px;" /></div>`);
        $span.append(`<div class="center">${house.cost}</div>`);
        $span.append(`<div class="center">${house.sqft}</div>`);
        $span.append(`<div class="center">${house.city}</div>`);
        $span.append(`<div class="center">${house.type}</div>`);
        $span.append(`<div class="center"><button class="delete">DELETE</button></div>`);
        $(`.outputSale`).append($span);
    }
}

function chooseImage(image){
    console.log('image:', image);
    switch(image){
        case image:
            return image;
            break;   
    }
}

function chooseSaleRent (type){
    switch(type){
        case type:
            return type;
            break;
    }
}
