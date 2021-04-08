
var updateItemTotal = function (ele) {
    var priceItem = parseFloat($(ele).find('.price input').val());
    var quantityItem = parseFloat($(ele).find('.quantity input').val());

    var indivPrice = priceItem * quantityItem;
    $(ele).children('.total').html(indivPrice);
    return indivPrice;
}

var sum = function (acc, x) { return acc + x; };

var updateGroceryCart = function () {

  var groceryTotalPriceArray = [];

  $('tbody tr').each(function (i, ele) {
    var eachItemTotal = updateItemTotal(ele);
    groceryTotalPriceArray.push(eachItemTotal);
  });

  var allGroceryPrice = groceryTotalPriceArray.reduce(sum);
  $('#totalPrice').html(allGroceryPrice);

};

$(document).ready(function () {
    updateGroceryCart();

    $(document).on('click', '.btn.remove', function (event) {
        $(this).closest('tr').remove();
        updateGroceryCart();
    });

    var timeout;
    $(document).on('input', 'tr input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
        updateGroceryCart();
        }, 1000);
    });

    $('#addGrocery').on('click', '.btn.add', function (event) {
        event.preventDefault();
        var name = $(this).children('[name=name]').val();
        var price = $(this).children('[name=price]').val();
        var quantity = $(this).children('[name=quantity]').val();

        console.log(name);

        $('tbody').append('<tr>' +
        '<td class="name">' + name + '</td>' +
        '<td class="price"><input type="number" value="' + price + '" /></td>' +
        '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' +
        '<td class="total"></td>' +
  
        '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
      '</tr>');
        
        updateGroceryCart();
        $(this).children('[name=name]').val('');
        $(this).children('[name=price]').val('');
        $(this).children('[name=quantity]').val('');

      });
    
      

});