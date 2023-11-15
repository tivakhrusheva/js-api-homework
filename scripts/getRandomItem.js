const API_URL = 'https://d5dqmrec9704nqgi2oe3.apigw.yandexcloud.net';


const getItemJSON = async() => {
    const response = await fetch(API_URL + '/get_random_item');
    const items = await response.json();
    return items
  };

async function renderItems() {
    let item = await getItemJSON();
    let html = '';
    let htmlSegment = `
    <div class="product_description">
        <div class="roadmap">
          <div class="account">Account</div>
          <img class="roadmap-child" alt="" src="../assets/product_page/line-13.svg" />

          <div class="account">Gaming</div>
          <img class="roadmap-item" alt="" src="../assets/product_page/line-14.svg" />

          <div class="nothing1">Product</div>
          <img class="roadmap-item" alt="" src="../assets/product_page/line-14.svg" />

          <div class="nothing1">View Cart</div>
          <img class="roadmap-child" alt="" src="../assets/product_page/line-13.svg" />

        <div class="english" style="white-space: nowrap;">${item.name}</div>
        </div>
    <div class="image-63-wrapper" >
        <ul>
            <li>
              <img class="image-63-icon" style="position: absolute; top: 350px; left: 200px; max-width:100%; height: auto;" id="main-icon" alt="" src=${item.img_url} />
            </li>
          </ul>
    </div>
        <div class="product-desc" style="position: absolute; bottom: 290px; right: 600px;">
            <div class="havic-hv-g-92" id="product-name">${item.name}</div>
            <div class="div" id="item-price">${item.price}</div>
            <div class="frame-group">
            <div class="four-star-parent">
                <div class="four-star">
                <img class="vector-icon" alt="" src="../assets/product_page/vector.svg" />

                <img class="vector-icon" alt="" src="../assets/product_page/vector.svg" />

                <img class="vector-icon" alt="" src="../assets/product_page/vector.svg" />

                <img class="vector-icon" alt="" src="../assets/product_page/vector.svg" />

                <img class="vector-icon4" alt="" src="../assets/product_page/vector1.svg" />
                </div>
                <div class="account">(150 Reviews)</div>
            </div>
            <div class="line-parent">
                <div class="frame-child"></div>
                <div class="in-stock">In Stock</div>
            </div>
            </div>
            <div class="playstation-5-controller">
            ${item.description}
        </div>
    </div>`;

    html += htmlSegment;

    //let container = document.querySelector('.product_description');
    let container = document.querySelector('.main_product');
    container.innerHTML = html;
}

renderItems();