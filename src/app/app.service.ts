import { Injectable } from '@angular/core';

// Gọi HttpClient, HttpHeaders
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Gọi observable
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  // url = 'http://localhost:3000/api/';
  url = 'https://be-nodejs-mean.herokuapp.com/api/';

  // cấu hình header
  option = { headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded") };

  list_aside()
  {
    return this.http.get( this.url + 'category/aside' );
  }

  get_id_category(slug:any)
  {
    return this.http.get( this.url + 'category/getid/' + slug );
  }

  api_get_category_list()
  {
    return this.http.get( this.url + 'category/list');
  }
  
  
  // ---------- product component ---------- //
  api_get_item_product(id_product:any)
  {
    return this.http.get( this.url + 'product/get_item/' + id_product );
  }

  api_add_item_product(product:any)
  {
    let body = new URLSearchParams();
    body.set('name', product.name);
    body.set('slug', product.slug);
    body.set('parent', product.parent);
    body.set('price', product.price);
    body.set('discount', product.discount);
    // body.set('gallery', product.gallery);
    body.set('status', product.status);
    body.set('detail', product.detail);
    body.set('img', product.gallery[0]);
    body.set('img2', product.gallery[1]);
    body.set('img3', product.gallery[2]);
    body.set('date_created', product.date_created);
    body.set('date_updated', product.date_updated);
    return this.http.post(this.url + 'product/add', body, this.option);
  }

  list_product()
  {
    return this.http.get( this.url + 'product/list' );
  }

  list_product_from_parent(parent:any)
  {
    return this.http.get( this.url + 'product/listProduct/' + parent );
  }

  get_info_product(slug:any)
  {
    return this.http.get( this.url + 'product/info/' + slug );
  }

  related__products(id_product:any, id_category:any)
  {
    return this.http.get( this.url + 'product/related__products/' + id_product + '/' + id_category );
  }

  get_data_category<T>(): Observable<T>
  {
    return this.http.get( this.url + 'product/info/' ).pipe(map((data:any) => data));
  }

  // login - register
  send_data_login(data:any)
  {
    let body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);
    return this.http.post(this.url + 'user/login', body, this.option);
  }

  send_data_register(registerData:any)
  {
    let body = new URLSearchParams();
    body.set('username', registerData.data.username);
    body.set('password', registerData.data.password);
    body.set('email', registerData.data.email);
    body.set('phone', registerData.data.phone);
    body.set('role', registerData.role);
    return this.http.post(this.url + 'user/register', body, this.option);
  }

  // ---------- cart component ---------- //
  //add cart to db
  post_cart_item(data:any)
  {
    let body = new URLSearchParams();
    body.set('id_user', data.id_user);
    body.set('id_product', data.id_product);
    body.set('name', data.name);
    body.set('price', data.price);
    body.set('qty', data.qty);
    body.set('img', data.img);
    return this.http.post(this.url + 'cart/add', body, this.option);
  }
  //get cart from db
  get_cart_list(id_user:any)
  {
    return this.http.get(this.url + 'cart/get_list/' + id_user);
  }
  //update cart from db
  api_update_cart(data:any, qty:any)
  {
    // console.log(data)
    let body = new URLSearchParams();
    body.set('id', data._id);
    body.set('qty', qty);
    return this.http.post(this.url + 'cart/update', body, this.option);
  }

  //delete cart from db
  api_delete_cart(data:any)
  {
    // console.log(data)
    let body = new URLSearchParams();
    body.set('id', data._id);
    return this.http.post(this.url + 'cart/delete', body, this.option);
  }

  // ---------- like component ---------- //
  //add like to db
  post_like_item(data:any)
  {
    let body = new URLSearchParams();
    body.set('id_user', data.id_user);
    body.set('id_product', data.id_product);
    body.set('name', data.name);
    body.set('price', data.price);
    body.set('img', data.img);
    return this.http.post(this.url + 'like/add', body, this.option);
  }
  //get like from db
  get_like_list(id_user:any)
  {
    return this.http.get(this.url + 'like/get_list/' + id_user);
  }

  //get like from db
  get_like_item(id_user:any, id_product:any)
  {
    return this.http.get(this.url + 'like/get_item/' + id_user + "/" + id_product);
  }

  //delete like from db
  api_delete_like(id_like:any)
  {
    // console.log(data)
    let body = new URLSearchParams();
    body.set('id', id_like);
    return this.http.post(this.url + 'like/delete', body, this.option);
  }


  // ---------- infor user component ---------- //
  //get user from db
  get_info_user(data:any)
  {
    return this.http.get(this.url + 'user/info-user/' + data);
  }
  
  // ---------- contact component ---------- //
  //send contact from db
  send_data_contact(data:any)
  {
    let body = new URLSearchParams();

    body.set('name', data.name);
    body.set('email', data.email);
    body.set('phone', data.phone);
    body.set('address', data.address);

    return this.http.post(this.url + 'contact/add', body, this.option);
  }

  //get token
  get_token(data:any)
  {
    return this.http.get( this.url + 'user/token/' + data);
  }

   // ---------- ship component ---------- //
  //delete ship from db
  api_add_ship(ship:any)
  {
    console.log(ship)
    let body = new URLSearchParams();
    body.set('id_user', ship.id_user);
    body.set('pay', ship.pay);
    body.set('array_cart', ship.array_cart);
    return this.http.post(this.url + 'ship/add', body, this.option);
  }
  //get user from db
  api_get_ship_user(id_user:any)
  {
    return this.http.get(this.url + 'ship/get_list/' + id_user);
  }

  // ---------- footer component ---------- //
  //  send
  api_send_mail(email:any)
  {
    return this.http.get( this.url + 'send_mail/' + email);
  }

}
