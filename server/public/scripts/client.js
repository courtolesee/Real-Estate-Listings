// on document load
$(document).ready(function() {
    console.log('JQ ready');
    getListings();
    $(`#addButtonSale`).on('click', addListing)
    $(`#addButtonRent`).on('click', addListing)

});

function getListings(){
    console.log('in getListings');
    $.ajax({
        method: `POST`,
        url: `/listings`
    }).then(function(response){
        console.log('in /listings POST');
        renderListings(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function renderListings(listing){
    $(`#output`).empty();
    for(let i=0; i<listing.length; i++) {
        let house = listing[i]
        let $span = $(`<span></span>`);
        $span.data(`id`, house.id);
        $span.append(`<div>${house.image_path}</div>`);
        $span.append(`<div>${house.cost}</div>`);
        $span.append(`<div>${house.sqft}</div>`);
        $span.append(`<div>${house.city}</div>`);
        $span.append(`<div>${house.type}</div>`);
        $span.append(`<div><button class="delete">DELETE</button></div>`);
    }
}

function addListing() {
    console.log('in addListing');
    let objectToSend = {
        sqFt: $(`#squareFootageIn`).val(''),
        cost: $(`#costIn`).val(''),
        type: $(`#typeIn`).val(''),
        city: $(`#cityIn`).val(''),
        pic: $(`#picIn`).val('')
    }
    console.log('sending', objectToSend);
    $.ajax({
        method: 'POST',
        url: '/router',
        data: objectToSend
    }).then(function(response){
        console.log('back from POST with:', response);
        getListings();
    }).catch(function(error){
        alert('error adding listing');
        console.log(error);
    })
}
