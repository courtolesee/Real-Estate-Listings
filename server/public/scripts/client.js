// on document load
$(document).ready(function() {
    console.log('JQ ready');
    getListings();
    $(`.outputSale`).on(`click`, `.delete`, deleteListing);
    $(`#addButtonSale`).on('click', addListing)
    $(`#addButtonRent`).on('click', addListing)
});

function deleteListing(){
    console.log('usbdfksdf');
    let id = $(this).closest(`span`).data(`id`);
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
    $(`.outputSale`).empty();
    for(let i=0; i<listing.length; i++) {
        let house = listing[i]
        console.log('house.cost:', house.cost);
        let $span = $(`<span></span>`);
        $span.data(`id`, house.id);

        $span.append(`<div><img src="./images/${image}" style="width: 200px;" /></div>`);
        switch(image){
            case "classic-flats":
                image = "./images/classic-flats.jpg";
                break;
            case "haunted":
                image = "./images/haunted.png";
                break;
            case "older":
                image = "./images/older.png";
                break;
            case "rental":
                image = "./images/rental.png";
                break;
            case "rental2":
                image = "./images/rental2.png";
                break;
            case "shiny":
                image = "./images/shiny.png";
                break;
            case "stong":
                image = "./images/stony.png";
                break;        
        }
        $span.append(`<div>${house.cost}</div>`);
        $span.append(`<div>${house.sqft}</div>`);
        $span.append(`<div>${house.city}</div>`);
        $span.append(`<div>${house.type}</div>`);
        $span.append(`<div><button class="delete">DELETE</button></div>`);
        $(`.outputSale`).append($span);
    }
}

// function chooseImage(image){
//     switch(image){
//         case "classic-flats":
//             image = "./images/classic-flats.jpg";
//             break;
//         case "haunted":
//             image = "./images/haunted.png";
//             break;
//         case "older":
//             image = "./images/older.png";
//             break;
//         case "rental":
//             image = "./images/rental.png";
//             break;
//         case "rental2":
//             image = "./images/rental2.png";
//             break;
//         case "shiny":
//             image = "./images/shiny.png";
//             break;
//         case "stong":
//             image = "./images/stony.png";
//             break;        
//     }
// }

function addListing() {
    console.log('in addListing');
    let objectToSend = {
        cost: $(`#costIn`).val(),
        sqft: $(`#squareFootageIn`).val(),
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
        $(`#cityIn`).val('');
        $(`#picIn`).val('');
    }).catch(function(error){
        alert('error adding listing');
        console.log(error);
    })
}
