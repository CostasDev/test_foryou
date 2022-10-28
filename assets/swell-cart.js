(function () {
  var myVar = setInterval(timer, 100);
  function timer() {
    if (window.jQuery) {
      $(document).ready(function () {
        if (window.location.href.indexOf("cart") == -1) {
          removeFreeProduct();
        }
        if (window.location.href.indexOf("checkout") > -1 && window.location.href.indexOf("thank_you") == -1) {
          var script = document.createElement("script");
         script.type = "text/javascript";
         script.src = "https://cdn-loyalty.yotpo.com/loader/lmKTv4brjzvrXL7sovn6Ug.js";
         document.getElementsByTagName("head")[0].appendChild(script);
         removeFreeProduct();

        }
      });
      stop();
    }
  }
  function stop() {
    clearInterval(myVar);
  }
}).call(this);
function removeFreeProduct() {
  $(document).on("swell:cart:updated", function () {
    var isPricedItem = 0;
    if (Swell.Cart.items.length > 0) {
      Swell.Cart.items.forEach(function (item) {
        if (item.final_price > 0) {
          if (item.properties["_swell_discount_type"] === undefined) {
            isPricedItem = 1;
          }
        }
      })
      if (isPricedItem == 0) {
        spapi.$.confirm({
          title: "Oops!",
          content: "You must add a priced item in your cart to redeem points for a free product.",
          type: "red",
          typeAnimated: true,
          useBootstrap: false,
          boxWidth: "400px",
          buttons: {
            ok: {
              text: "Ok",
              action: function () {
                window.location.href = "/cart/clear";
              }
            }
          }
        });
      }
    }
  });
};
