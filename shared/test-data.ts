import { v4 as uuidv4 } from 'uuid';

const fullOrder = {
    "token": "8a6e0804-2bd0-4672-b79d-d97027f9071a",
    "seller": {
        "role": "seller",
        "address": "Arkadiankatu 3-6",
        "name": "John Doe",
        "mobile": "5555555",
    },
    "buyer" : {
        "role": "buyer",
        "address": "Simonkatu 7, 00100 Helsinki",
        "name": "Jack Reaper",
        "mobile": "5555555",
    },
    "accountNumber": "Some account number with 5555",
    "price": 56,
    "height": 30,
    "width": 25,
    "length": 20,
    "weight": 5
};

const sellerHalfOrder = {
    "token": "8a6e0804-2bd0-4672-b79d-d98797f9071a",
    "seller": {
        "role": "seller",
        "address": "Arkadiankatu 3-6",
        "name": "John Does",
        "mobile": "4444444",
    },
    "accountNumber": "Some account number with 5555",
    "price": 56,
    "height": 30,
    "width": 25,
    "length": 20,
    "weight": 5
};

const buyerHalfFull = {
    "token": "8a6e0804-2bd0-4672-b79d-d98797f9071a",
    "seller": {
        "role": "seller",
        "address": "Arkadiankatu 3-6",
        "name": "John Does",
        "mobile": "4444444"
    },
    "buyer" : {
        "role": "buyer",
        "address": "Simonkatu 7, 00100 Helsinki",
        "name": "Some other Jack",
        "mobile": "88888888"
    },
    "accountNumber": "Some account number with 5555",
    "price": 56,
    "height": 30,
    "width": 25,
    "length": 20,
    "weight": 5
};

