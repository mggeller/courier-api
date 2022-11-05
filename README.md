# courier-api

## **UI Repository and Application LINKs**
**GitHub**: https://github.com/ArtHell/courier-ui

**Application**: https://courier-ui.vercel.app/

## **Endpoints**

### Customer Table

```json
{
    "role": "string",
    "address": "string",
    "name": "string",
    "mobile": "string"
}
```

Example  

```json
{
    "role": "seller",
    "address": "Arkadiankatu 3-6",
    "name": "John Doe",
    "mobile": "55442221"
}
```

### Order table
```json
{
    "orderToken": "string",
    "seller": "Customer object",
    "buyer": "Customer object",
    "accountNumber": "string",
    "price": "number",
    "height": "number",
    "width": "number",
    "length": "number",
    "weight": "number"
}
```

Exampe:  

```json
{
    "orderToken": "8a6e0104-2bd0-8888-8888-d97027f9071a",
    "seller": {
        "role": "seller",
        "address": "Arkadiankatu 3-6",
        "name": "John Doe",
        "mobile": "55331123"
    },
    "buyer": {
        "role": "buyer",
        "address": "Simonkatu 7, 00100 Helsinki",
        "name": "John Deer",
        "mobile": "55554444"
    },
    "accountNumber": "EE8769619762963196",
    "price": 56,
    "height": 30,
    "width": 25,
    "length": 20,
    "weight": 5
}
```

### **GET**

#### **/orders**
Returns list of all orderst that are currenlty in the database.

#### **/orders/:orderToken**

Returns order by orderToken

### **POST**

#### **/orders**
Creates initial order with only seller's information in there and package info.  
Required body: **Order**

#### **/order/:orderToken**
Submits Wolt Delivery order through Wolt API and in Response gets Wolt API response on successful request or 'ERR_BAR_REQUEST' in case of an error.

### **PUT**

#### **/orders/:token**
Finds order with given token and adds buyer to the already existing Order.
