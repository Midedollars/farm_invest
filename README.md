# Product Name - Farmvesty

Farmvesty is a platform making it easy for anyone to invest in a farm. A users
can sign up, invest in a particular farm and manage all activities on his
dashboard. MySQL to store users' data and PostgreSQL to store other data.
Connect to database through AWS database service.

Features built,
1.Authenticated users with Oauth2 and social login (Google)
2.Created an endpoint to view all available farm investments, fetched 10 per time
and tested with 25 data in my database
3.Created an endpoint to make payment and invest in a farm (Return 200 and
name of farm if successful) using Flutterwave. Used unit the user is buying to
calculate total amount
4. Created an endpoint to upload new farm investments package for anyone with
"ROLE ADMIN"
5. Created an endpoint to change status of farm investment package from
"available" to "not available and vice versa


## Documentation

[FarmVesty](https://documenter.getpostman.com/view/19404806/UVyyuDVA)