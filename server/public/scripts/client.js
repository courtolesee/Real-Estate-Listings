// on document load
$(document).ready(function() {
    console.log('JQ ready');
    getListings3();
    $(`.outputSale`).on(`click`, `.delete`, deleteListing);
    $(`#addButtonSale`).on('click', addListing)
    $(`#forSale`).on('click', getListings)
    $(`#forRent`).on('click', getListings2)
    $(`#showAll`).on('click', getListings3)
});

function deleteListing(){
    let id = $(this).closest(`span`).data(`id`);
    let popup = confirm(`Delete this listing?`);
    if(popup == true){
        $.ajax({
            method: `DELETE`,
            url: `/listings/${id}`
        }).then(function(response){
            console.log(`in /${id} DELETE`);
            getListings3();
        }).catch(function(error){
        alert(`something went wrong`);
        console.log(error)
        });
    }
}

function getListings(){
    $.ajax({
        method: `GET`,
        url: `/listings/sale`
    }).then(function(response){
        console.log('in /listings/sale GET');
        renderListings(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function getListings2(){
    $.ajax({
        method: `GET`,
        url: `/listings/rent`
    }).then(function(response){
        console.log('in /listings/rent GET');
        renderListings(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}

function getListings3(){
    $.ajax({
        method: `GET`,
        url: `/listings`
    }).then(function(response){
        console.log('in /listings GET');
        renderListings(response);
    }).catch(function(error){
    alert(`something went wrong`);
    console.log(error)
    });
}


function renderListings(listing){
    $(`.outputSale`).empty();
    for(let i=0; i<listing.length; i++) {
        let house = listing[i]
        let $span = $(`<span></span>`);
        $span.data(`id`, house.id);
        if($(`#addButtonSale`))
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
    switch(image){
        case '1':
            return "classic-flats.jpg";
            break;
        case '2':
            return "haunted.png";
            break;
        case '3':
            return "older.jpg";
            break;
        case '4':
            return "rental.jpg";
            break;
        case '5':
            return "rental2.jpg";
            break;
        case '6':
            return "shiny.jpg";
            break;
        case '7':
            return "stony.jpg";
            break;        
    }
}

function chooseSaleRent (type){
    switch(type){
        case 'sale':
            return "sale";
            break;
        case 'rent':
            return "rent";
            break;
    }
}


function addListing() {
    console.log('in addListing');
    let objectToSend = {
        cost: $(`#costIn`).val(),
        sqft: $(`#squareFootageIn`).val(),
        type: chooseSaleRent($(`#saleOrRent`).val()),
        city: $(`#cityIn`).val(),
        image_path: chooseImage($(`#images`).val())
    }
    console.log('sending');
    $.ajax({
        method: 'POST',
        url: '/listings',
        data: objectToSend
    }).then(function(response){
        console.log('back from POST with:');
        getListings3();
        $(`#squareFootageIn`).val('');
        $(`#costIn`).val('');
        $(`#typeIn`).val('');
        $(`#cityIn`).val('');
    }).catch(function(error){
        alert('error adding listing');
        console.log(error);
    })
}
