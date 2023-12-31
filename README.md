# js-api-homework

### Принцип работы
При открытии страницы product_page.html к эндпойнту /get_random_item API https://d5dqmrec9704nqgi2oe3.apigw.yandexcloud.net, развернутому в Яндекс-облаке, отправляется **GET**-запрос, возвращающий  мета-данные по одному случайному продукту магазина -- таким образом я создала симуляцию разных товаров с шаблоном одной и той же веб-страницы. Пример запроса в Postman:

<img src="https://github.com/tivakhrusheva/js-api-homework/assets/91075802/d1f78ddc-7a90-4d5f-b2c8-0daec48776cf" width="50%" height="30%"> 

Пока что в базе данных, где и хранятся мета-данные, всего 3 товара, но, т.к. это прототип, я посчитала такое количество достаточным для демонстрации основного функционала.

<img src="https://github.com/tivakhrusheva/js-api-homework/assets/91075802/2ca20262-20a9-4856-958d-eab8ea713f4f" width="50%" height="50%"> 

При успешном ответе от сервера на запрос полученные данные парсятся и используются для рендеринга HTML-кода страницы. 

На этой же странице для изменения пользователем доступен параметр количества товаров -- он меняется при нажатии на кнопки "+" или "-". Примеры экранов:

<img src="https://github.com/tivakhrusheva/js-api-homework/assets/91075802/fd00652d-f520-4fa3-b201-406a390776bb" width="50%" height="30%"> 

<img src="https://github.com/tivakhrusheva/js-api-homework/assets/91075802/2b7a15b4-8bf2-4981-9194-94593372c7fb" width="50%" height="30%"> 

Когда пользователь определяется с нужным количеством, он нажимает на кнопку **"Buy Now"**, после чего к эндпойнту /add_item отправлятся **POST**-запрос. Этот запрос заносит в БД данные о **стоимости** и **количестве** товара, его **названии**, а также об **айди пользователя**. Пример запроса в Postman:

<img src="https://github.com/tivakhrusheva/js-api-homework/assets/91075802/8ffd85d3-5f7b-4fc6-bd5c-0ed6445e5c01" width="50%" height="30%"> 

Помимо этого, после нажатия на кнопку **"Buy Now"** со страницы с товаром product-page.html происходит автоматический переход на страницу корзины cart-page.html, где значения **конечной стоимости**, **названия** и **количества** **товара** отрисовываются с помощью получения данных для данного юзера через **GET**-запрос к эндпойнту /get_cart/{userId}. Пример запроса в Postman:

<img src="https://github.com/tivakhrusheva/js-api-homework/assets/91075802/fad02f62-9bb9-4fa4-a3d7-26163cbc87cc" width="50%" height="30%"> 

Пример экрана:

<img src="https://github.com/tivakhrusheva/js-api-homework/assets/91075802/492151d1-dc23-466a-a3b2-a0397547c49a" width="50%" height="30%"> 

Для передачи уникального айди пользователя между двумя страницами используется стандартный объект **localStorage**.
### Скринкаст с примером работы

[link](https://storage.yandexcloud.net/test-bucket-for-uxers/hw-screencast.mkv "link")

* для корректной работы запускать файл product_page.html стоит в режиме лайв сервера
