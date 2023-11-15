const API_URL = 'https://d5dqmrec9704nqgi2oe3.apigw.yandexcloud.net';


const fetchCartJSON = async(user_id) => {
    const response = await fetch(API_URL + '/get_cart/' + String(user_id));
    if (response.status == 404)
    {
        throw new Error('User not found!');
    }
    else {
    const items = await response.json();
    return items
  }};

async function renderItems() {
    let items = await fetchCartJSON("userId");
    let html = '';
    let htmlSegment = `<div class="div2"> ${items.item_price}</div>
    <div class="div3">${items.item_price.replace("$","")*Number(items.item_n)}</div>
    <div class="quantity1">
      <div class="parent">
        <div class="product">${items.item_n}</div>
        <div class="drop-up-small-parent">
          <img
            class="drop-up-small-icon"
            alt=""
            src="../assets/cart-page/dropupsmall.svg"
          />

          <img
            class="drop-up-small-icon"
            alt=""
            src="../assets/cart-page/dropdownsmall.svg"
          />
        </div>
      </div>
    </div>
    <div class="monitor-cart-small">
      <img
        class="g27cq4-500x500-1-icon"
        alt=""
        src="${items.item_url}"
      />
    </div>
    <div class="lcd-monitor">${items.item_name}</div>
    <img class="icon-cancel" alt="" src="../assets/cart-page/iconcancel.svg" />`;

    html += htmlSegment;

    let container = document.querySelector('.cart-section');
    container.innerHTML = html;
}

renderItems();