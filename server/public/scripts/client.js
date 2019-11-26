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
        method: `GET`,
        url: `/listings`
    }).then(function(response){
        console.log('in /listings POST');
        console.log('respose:', response);
        renderListings(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function renderListings(listing){
    $(`.output`).empty();
    for(let i=0; i<listing.length; i++) {
        let house = listing[i]
        console.log('house.cost:', house.cost);
        let $span = $(`<span></span>`);
        $span.data(`id`, house.id);
        $span.append(`<div><img src="./images/${house.image_path}" style="width: 200px;" /></div>`);
        $span.append(`<div>${house.cost}</div>`);
        $span.append(`<div>${house.sqft}</div>`);
        $span.append(`<div>${house.city}</div>`);
        $span.append(`<div>${house.type}</div>`);
        $span.append(`<div><button class="delete">DELETE</button></div>`);
        $(`.output`).append($span);
    }
}

function addListing() {
    console.log('in addListing');
    let objectToSend = {
        cost: $(`#costIn`).val(),
        sqft: $(`#squareFootageIn`).val(''),
        type: $(`#typeIn`).val(),
        city: $(`#cityIn`).val(),
        image_path: $(`#picIn`).val()
    }
    console.log('sending', objectToSend);
    $.ajax({
        method: 'POST',
        url: '/listings',
        data: objectToSend
    }).then(function(response){
        console.log('back from POST with:', response);
        getListings();
        $(`#squareFootageIn`).val(''),
        $(`#costIn`).val('');
        $(`#typeIn`).val('');
        $(`#cityIn`).val('');
        $(`#picIn`).val('');
    }).catch(function(error){
        alert('error adding listing');
        console.log(error);
    })
}
