# DEMO URL

https://eric-305cde.herokuapp.com/

### Dummy Account for testing

```sh
username - test
password - 123456
```

# Credits

### Website Templates

https://startbootstrap.com/template-overviews/freelancer/

https://startbootstrap.com/template-overviews/1-col-portfolio/

### Packages

Mongoose - http://mongoosejs.com

NodeMailer - http://nodemailer.com

### Public APIs

https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/

http://gecimi.readthedocs.io/en/latest/


# API Endpoints

### User Login
```sh
URI       http://https://eric-305cde.herokuapp.com/login
Method	  POST
Data	  {
          "username": "user1",
          "password": "pass1"
}
Result	{
    "username": "user1",
    "password": "pass1",
    "email": "user@email",
    "fullname": "User One",
    "favourites": [
                    12345678,
                    23456789
                  ]
}
Error	{
    "login": "fail"
}
```

### User Registration
```sh
URI       http://https://eric-305cde.herokuapp.com/register
Method	  POST
Data	  {
          "username": "user1",
          "email": "user@email",
          "fullname": "User One"
}
Result	{
          "Reg": "OK"
}
Error	{
          "Reg": "FAIL"
}
```
### User's Favourites List
```sh
URI       http://https://eric-305cde.herokuapp.com/fav
Method	  POST
Data	  {
          "username": "user1",
          "password": "pass1"
}
Result	[
          {
            "_id": "58cfa6da801c230400f9fdb5",
            "trackId": 854739113,
            "trackName": "Counting Stars",
            "artistName": "OneRepublic",
            "collectionName": "Native",
            "artworkUrl100": "http://is5.mzstatic.com/image/thumb/Music2/v4/fe/1e/05/fe1e058a-ab64-ff26-e2e7-fdca13f728c2/source/100x100bb.jpg",
            "previewUrl": "http://a983.phobos.apple.com/us/r30/Music2/v4/bf/14/8e/bf148ef1-ed07-af9f-6c85-735e65f6ef35/mzaf_7659402428735601525.plus.aac.p.m4a",
            "likes": 2,
            "__v": 0
          },
          {
            "_id": "58cfa8ba96e5d404002a5566",
            "trackId": 402154219,
            "trackName": "Let It Be",
            "artistName": "The Beatles",
            "collectionName": "Let It Be",
            "artworkUrl100": "http://is3.mzstatic.com/image/thumb/Music/v4/98/10/bd/9810bd86-9023-fb20-c6d8-d15e6a25222e/source/100x100bb.jpg",
            "previewUrl": "http://audio.itunes.apple.com/apple-assets-us-std-000001/AudioPreview62/v4/10/2d/1a/102d1a3a-a69a-15f0-a342-c1a30db9bafe/mzaf_7059478824994958871.plus.aac.p.m4a",
            "likes": 1,
            "__v": 0
          }
]
Error	{
}
```
### Add to Favourites List
```sh
URI       http://https://eric-305cde.herokuapp.com/
Method	  PUT
Data	  {
          "username": "user1",
          "password": "pass1",
          "add": 34567890
}
Result	{
    "username": "user1",
    "password": "pass1",
    "email": "user@email",
    "fullname": "User One",
    "favourites": [
                    12345678,
                    23456789,
                    34567890
                  ]
}
Error	{
    "Add": "FAIL"
}
```
### Remove from Favourites List
```sh
URI       http://https://eric-305cde.herokuapp.com/
Method	  DELETE
Data	  {
          "username": "user1",
          "password": "pass1",
          "rm": 34567890
}
Result	{
    "username": "user1",
    "password": "pass1",
    "email": "user@email",
    "fullname": "User One",
    "favourites": [
                    12345678,
                    23456789
                  ]
}
Error	{
    "Remove": "FAIL"
}
```
### Search a song
```sh
URI       http://https://eric-305cde.herokuapp.com/search
Method	  GET
Data	  {
          "q": "beatles"
}
Result	{
          "resultCount": 2,
          "results": [
            {
              "trackId": 401187150,
              "trackName": "Here Comes the Sun",
              "artistName": "The Beatles",
              "collectionName": "Abbey Road",
              "artworkUrl100": "http://is3.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/100x100bb.jpg",
              "previewUrl": "http://audio.itunes.apple.com/apple-assets-us-std-000001/AudioPreview71/v4/46/48/7d/46487d90-d40c-7c47-7285-5edbfd0fd2c0/mzaf_5516723347634890825.plus.aac.p.m4a"
            },
            {
              "trackId": 401151904,
              "trackName": "Let It Be",
              "artistName": "The Beatles",
              "collectionName": "Let It Be",
              "artworkUrl100": "http://is3.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/100x100bb.jpg",
              "previewUrl": "http://a172.phobos.apple.com/us/r30/Music4/v4/a0/05/df/a005df47-d4d5-1fd1-eefc-77553fa59689/mzaf_5617395189778548804.plus.aac.p.m4a"
            }
}
Error	{
          "resultCount": 0
}
```
### Retrieve Top 20 Songs from all users' list
```sh
URI       http://https://eric-305cde.herokuapp.com/top
Method	  GET
Data	  {
}
Result	[
          {
            "_id": "58cfa6da801c230400f9fdb5",
            "trackId": 854739113,
            "trackName": "Counting Stars",
            "artistName": "OneRepublic",
            "collectionName": "Native",
            "artworkUrl100": "http://is5.mzstatic.com/image/thumb/Music2/v4/fe/1e/05/fe1e058a-ab64-ff26-e2e7-fdca13f728c2/source/100x100bb.jpg",
            "previewUrl": "http://a983.phobos.apple.com/us/r30/Music2/v4/bf/14/8e/bf148ef1-ed07-af9f-6c85-735e65f6ef35/mzaf_7659402428735601525.plus.aac.p.m4a",
            "likes": 2,
            "__v": 0
          },
          {
            "_id": "58cfa8ba96e5d404002a5566",
            "trackId": 402154219,
            "trackName": "Let It Be",
            "artistName": "The Beatles",
            "collectionName": "Let It Be",
            "artworkUrl100": "http://is3.mzstatic.com/image/thumb/Music/v4/98/10/bd/9810bd86-9023-fb20-c6d8-d15e6a25222e/source/100x100bb.jpg",
            "previewUrl": "http://audio.itunes.apple.com/apple-assets-us-std-000001/AudioPreview62/v4/10/2d/1a/102d1a3a-a69a-15f0-a342-c1a30db9bafe/mzaf_7059478824994958871.plus.aac.p.m4a",
            "likes": 1,
            "__v": 0
          }
]
Error	[
]
```
### Search a lyric
```sh
URI       http://https://eric-305cde.herokuapp.com/lyric
Method	  GET
Data	  {
          "q": "beat it"
}
Result	{
         "[00:15.50]Beat it
          [00:38.50]They Told Him Don't You Ever Come Around Here
          [00:42.50]Don't Wanna See Your Face, You Better Disappear
          [00:45.50]The Fire's In Their Eyes And Their Words Are Really Clear
          [00:48.50]So Beat It, Just Beat It
          [00:53.50]You Better Run, You Better Do What You Can
          [00:55.50]Don't Wanna See No Blood, Don't Be A Macho Man
          [00:59.50]You Wanna Be Tough, Better Do What You Can
          [01:02.50]So Beat It, But You Wanna Be Bad
          [01:07.50]Just Beat It, Beat It, Beat It, Beat It
          [01:09.50]No One Wants To Be Defeated
          [01:13.50]Showin' How Funky Strong Is Your Fighter
          [01:15.50]It Doesn't Matter Who's Wrong Or Right
          [01:20.50]Just Beat It, Beat It"
}
Error	{
           "Cannot find lyrics."
}
```
