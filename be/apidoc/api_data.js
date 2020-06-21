define({ "api": [
  {
    "type": "get",
    "url": "/admin/restaurant/:id/:status",
    "title": "Set status of Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Restaurant unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>set Restaurant Active or In-Active.</p>"
          }
        ]
      }
    },
    "name": "Get_a_Restaurant_Admin",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>bearer + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data.status",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\": {\n        \"status\": true\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.ts",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/restaurants",
    "title": "Get all Restaurants",
    "name": "Get_all_Restaurants_Admin",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>bearer + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.restaurants",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.restaurants.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.restaurants.email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.restaurants.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.restaurants.password",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.restaurants.description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.restaurants.status",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.restaurants.updatedAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.restaurants.createdAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n   \"success\": true,\n   \"data\": {\n     \"restaurants\": [\n           {\n               \"id\": \"9077fc7a-78a0-4457-ba15-7e1a2b9c919a\",\n               \"email\": \"as11d@asd.com\",\n               \"name\": \"as1d\",\n               \"password\": \"sad1asd\",\n               \"description\": null,\n               \"status\": false,\n               \"updatedAt\": \"2020-05-02T12:24:40.877Z\",\n               \"createdAt\": \"2020-05-02T12:24:40.877Z\"\n           },\n           {\n               \"id\": \"9af6de24-9b32-4063-ac9a-c4f45e5ae54b\",\n               \"email\": \"as1123d@asd.com\",\n               \"name\": \"a4s1d\",\n               \"password\": \"$2b$08$PtVgwy3Jv3NGgpjQfottT.g.uPLa9SO4hHE8/DQKP98rCFQIXo43O\",\n               \"description\": null,\n               \"status\": false,\n               \"updatedAt\": \"2020-05-02T12:28:31.266Z\",\n               \"createdAt\": \"2020-05-02T12:28:31.266Z\"\n           }\n       ]\n      }\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.ts",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/signin",
    "title": "Signin Admin",
    "name": "SignIn_Admin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request: ",
          "content": " {\n  \"email\": \"admin@app.com\",\n  \"password\": \"helloworld\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n   \"success\": true,\n   \"data\": {\n       \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/admin.ts",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/customer/nearby-restaurant",
    "title": "Find NearBy Restaurant",
    "name": "Find_NearBy_Restaurant",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "latitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "longitude",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n  \"latitude\": \"24.860735\",\n  \"longitude\": \"67.001137\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.restaurants",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.restaurants.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.restaurants.email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.restaurants.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.restaurants.description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "data.restaurants.image_url",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"success\": true,\n    \"data\": {\n        \"restaurants\": [\n            {\n                \"id\": \"d74c496c-73df-493c-b82e-122f05f04b1d\",\n                \"name\": \"pizza\",\n                \"email\": \"admin@pizza.com\",\n                \"image_url\": null,\n                \"address\": {\n                    \"type\": \"Point\",\n                    \"coordinates\": [\n                        67.001137,\n                        24.860735\n                    ]\n                },\n                \"description\": \"edittted@a12112sd.com\"\n            }\n             ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/customer.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/customer/orders",
    "title": "Get all orders of Customer",
    "name": "Get_all_orders_of_Customer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>bearer + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.order",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.order.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.order.status",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.order.updatedAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.order.createdAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\": [\n        {\n            \"id\": \"41bf61d1-b610-450f-aa1d-19c482af846d\",\n            \"status\": \"PENDING\",\n            \"updatedAt\": \"2020-05-16T23:34:54.275Z\",\n            \"createdAt\": \"2020-05-16T21:35:56.135Z\"\n        },\n        {\n            \"id\": \"2874a1d0-2f94-4449-84cc-0e969e582a12\",\n            \"status\": \"DELIVERED\",\n            \"updatedAt\": \"2020-05-16T23:37:03.388Z\",\n            \"createdAt\": \"2020-05-16T21:37:30.923Z\"\n        },\n        {\n            \"id\": \"2f5fbc69-80c7-4276-86ec-11f0eb85528b\",\n            \"status\": \"RECEIVED\",\n            \"updatedAt\": \"2020-05-16T23:37:15.947Z\",\n            \"createdAt\": \"2020-05-16T21:36:55.083Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/customer.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/customer/order/received/:orderId/",
    "title": "Mark Order Received",
    "name": "Mark_Order_Received",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>bearer + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\": {\n        \"id\": \"2874a1d0-2f94-4449-84cc-0e969e582a12\",\n        \"status\": \"RECEIVED\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/customer.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customer/place-order/:dealId",
    "title": "Place order against Deal",
    "name": "Place_order_against_Deal",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n  \"description\": \"deal 3\",\n  \"price\": \"500\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.orderId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"success\": true,\n    \"data\": {\n        \"orderId\": \"77c50517-a5ff-4488-be71-52681f4e1ce8\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/customer.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customer/signin",
    "title": "Signin Customer",
    "name": "SignIn_Customer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": " {\n  \"email\": \"john@doe.com\",\n  \"password\": \"asdasd\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n   \"success\": true,\n   \"data\": {\n       \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/customer.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/customer/signup",
    "title": "SignUp Customer",
    "name": "SignUp_Customer",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": " {\n  \"email\": \"john@doe.com\",\n  \"name\": \"john Doe\"\n  \"password\": \"asdasd\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n \"data\": {\n    \"name\": \"john Doe\",\n    \"email\": \"john@doe.com\",\n    \"id\": \"3f92b093-7eee-4cc8-ab87-a61fa54a5984\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/customer.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/restaurant/deal",
    "title": "Add Deal",
    "name": "Add_Deal",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image_url",
            "description": "<p>(base64)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "\n {\n  \"description\": \"rest 2 deal 6\",\n  \"price\": \"700\",\n  \"image_url\": \"data:image/png;base64,iVBORw0K....\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.price",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n  {\n    \"success\": true,\n    \"data\": {\n        \"description\": \"rest 2 deal 1\",\n        \"price\": \"300\",\n        \"restaurant\": \"3f92b093-7eee-4cc8-ab87-a61fa54a5984\",\n        \"image_url\": null,\n        \"id\": \"27820b5a-9ce1-4a51-b992-485b82a320e9\",\n        \"createdAt\": \"2020-05-10T20:36:13.298Z\",\n        \"updatedAt\": \"2020-05-10T20:36:13.298Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/restaurant.ts",
    "groupTitle": "Restaurant"
  },
  {
    "type": "post",
    "url": "/restaurant/add-info",
    "title": "Add Info of Restaurant",
    "name": "Add_Info_of_Restaurant",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "latitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "longitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "image_url",
            "description": "<p>String (base64)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": "{\n   \"description\": \"edittted@a12112sd.com\",\n   \"latitude\": \"24.860735\",\n   \"longitude\": \"67.001137\",\n   \"image_url\": [\"data:image/png;base64,iVBORw....\", \"data:image/png;base64,DecTGHE....\"]\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.latitude",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.longitude",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n  {\n    \"success\": true,\n    \"data\": {\n        \"id\": \"3f92b093-7eee-4cc8-ab87-a61fa54a5984\",\n        \"description\": \"edittted@a12112sd.com\",\n        \"latitude\": \"333,33\",\n        \"longitude\": \"33.3333\",\n        \"updatedAt\": \"2020-05-10T20:33:42.694Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/restaurant.ts",
    "groupTitle": "Restaurant"
  },
  {
    "type": "get",
    "url": "/restaurant/deals/",
    "title": "Get All Deals of restaurant",
    "name": "Get_All_Deals_of_restaurant",
    "group": "Restaurant",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>bearer + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.deals",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deals.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deals.description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deals.price",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\": [\n        {\n            \"id\": \"27820b5a-9ce1-4a51-b992-485b82a320e9\",\n            \"description\": \"rest 2 deal 1\",\n            \"price\": \"300\",\n            \"image_url\": null,\n            \"createdAt\": \"2020-05-10T20:36:13.298Z\",\n            \"updatedAt\": \"2020-05-10T20:36:13.298Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/restaurant.ts",
    "groupTitle": "Restaurant"
  },
  {
    "type": "get",
    "url": "/restaurant/orders/",
    "title": "Get All orders of restaurant",
    "name": "Get_All_orders_of_restaurant",
    "group": "Restaurant",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>bearer + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.order",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.order.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.order.status",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.order.updatedAt",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.order.createdAt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\": [\n        {\n            \"id\": \"41bf61d1-b610-450f-aa1d-19c482af846d\",\n            \"status\": \"PENDING\",\n            \"updatedAt\": \"2020-05-16T23:34:54.275Z\",\n            \"createdAt\": \"2020-05-16T21:35:56.135Z\"\n        },\n        {\n            \"id\": \"2874a1d0-2f94-4449-84cc-0e969e582a12\",\n            \"status\": \"DELIVERED\",\n            \"updatedAt\": \"2020-05-16T23:37:03.388Z\",\n            \"createdAt\": \"2020-05-16T21:37:30.923Z\"\n        },\n        {\n            \"id\": \"2f5fbc69-80c7-4276-86ec-11f0eb85528b\",\n            \"status\": \"RECEIVED\",\n            \"updatedAt\": \"2020-05-16T23:37:15.947Z\",\n            \"createdAt\": \"2020-05-16T21:36:55.083Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/restaurant.ts",
    "groupTitle": "Restaurant"
  },
  {
    "type": "get",
    "url": "/restaurant/deal/:dealId",
    "title": "Get One Deal of restaurant",
    "name": "Get_One_Deals_of_restaurant",
    "group": "Restaurant",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>bearer + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.deal",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deal.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deal.description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.deal.price",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\":\n        {\n            \"id\": \"27820b5a-9ce1-4a51-b992-485b82a320e9\",\n            \"description\": \"rest 2 deal 1\",\n            \"price\": \"300\",\n            \"image_url\": null,\n            \"createdAt\": \"2020-05-10T20:36:13.298Z\",\n            \"updatedAt\": \"2020-05-10T20:36:13.298Z\"\n        }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/restaurant.ts",
    "groupTitle": "Restaurant"
  },
  {
    "type": "get",
    "url": "/restaurant/order/delivered/:orderId/",
    "title": "Mark Restaurant Delivered",
    "name": "Mark_Restaurant_Delivered",
    "group": "Restaurant",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>bearer + token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"authorization\": \"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.status",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"success\": true,\n    \"data\": {\n        \"id\": \"2874a1d0-2f94-4449-84cc-0e969e582a12\",\n        \"status\": \"DELIVERED\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/restaurant.ts",
    "groupTitle": "Restaurant"
  },
  {
    "type": "post",
    "url": "/restaurant/signin",
    "title": "Signin Restaurant",
    "name": "SignIn_Restaurant",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": " {\n  \"email\": \"admin@burgerlab.com\",\n  \"password\": \"asdasd\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.token",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n   \"success\": true,\n   \"data\": {\n       \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YTViMDFkLTk0MmYtNDJmMy1iMzI4LTRjZjNjOGJlNDBhNiIsImVtYWlsIjoiYWRtaW5AYXBwLmNvbSIsImlhdCI6MTU4OTE0MDI4MywiZXhwIjoxNTg5MjI2NjgzfQ.XDdf89M_j4KFetQ4Nr1u-3smKa0ukcJy4BCYke3JhtM\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/restaurant.ts",
    "groupTitle": "Restaurant"
  },
  {
    "type": "post",
    "url": "/restaurant/signup",
    "title": "SignUp Restaurant",
    "name": "SignUp_Restaurant",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request:",
          "content": " {\n  \"email\": \"admin@burgerlab.com\",\n  \"name\": \"burgerlab\"\n  \"password\": \"asdasd\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.email",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.id",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n \"data\": {\n    \"name\": \"xsaw\",\n    \"email\": \"a1s112223d@a122sd.com\",\n    \"id\": \"3f92b093-7eee-4cc8-ab87-a61fa54a5984\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/restaurant.ts",
    "groupTitle": "Restaurant"
  }
] });
