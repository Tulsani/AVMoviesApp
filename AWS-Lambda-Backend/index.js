// Import the MongoDB driver
const MongoClient = require("mongodb").MongoClient;

// Define our connection string.
const MONGODB_URI =
  "mongodb+srv://moviedb:<password>@av-moviedb.4nbpl.mongodb.net/Testing?retryWrites=true&w=majority";
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(MONGODB_URI);

  // Specify which database we want to use
  const db = await client.db("Testing");

  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {

  /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. AWS Lambda will freeze the process, any state data, and the events in the event loop. Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
  context.callbackWaitsForEmptyEventLoop = false;

  // Get an instance of our database
  const db = await connectToDatabase();

  /*Get ALL the movies*/
  // Make a MongoDB MQL Query to go into the movies collection and return the first 20 movies.
  let method=event.requestContext.http.method;
   if(method == 'GET'){
     console.log(event.queryStringParameters);
  if(event.queryStringParameters.searchType=='getAll'){
  const movies = await db.collection("av-movieDB").find({}).limit(20).toArray();

  const response = {
    statusCode: 200,
    body: JSON.stringify(movies),
  };

  return response;
  }

/* Regex based custom search*/
  if(event.queryStringParameters.searchType=='custom'){

      let query = ((event.queryStringParameters.searchString)?(event.queryStringParameters.searchString):"");
      const searchResult_Title = await db.collection("av-movieDB").find({title:new RegExp(query)}).limit(20).toArray();
      const searchResult_Desc  = await db.collection("av-movieDB").find({description:new RegExp(query)}).limit(20).toArray();
      const searchResult_Director = await db.collection("av-movieDB").find({director:new RegExp(query)}).limit(20).toArray();
      const searchResult_Genre = await db.collection("av-movieDB").find({genre:new RegExp(query)}).limit(20).toArray();
      const searchResult_Actor = await db.collection("av-movieDB").find({cast:new RegExp(query)}).limit(20).toArray();
      const searchResult_Final = searchResult_Title.concat(searchResult_Desc,searchResult_Director,searchResult_Genre,searchResult_Actor);
      console.log(searchResult_Final);

  const response = {
    statusCode: 200,
    body: JSON.stringify(searchResult_Final)
  };

  return response;
  }

  /* Get user info detail */
  if(event.queryStringParameters.searchType=="userInfo"){
    let userEmailId = ((event.queryStringParameters.emailId)?(event.queryStringParameters.emailId):"");
    if(userEmailId !=""){
      const getUserRentedMovies = await db.collection("userDetails").find({user:userEmailId}).limit(20).toArray();
      const respone = {
        statusCode :200,
        body: JSON.stringify(getUserRentedMovies)
      }
      return respone;
    }
    else{
      const errResp={
        statusCode:500,
        body:"Error occured during search"
      }
      return errResp
    }
  }
  // GET METHOD ENDED
   }

// Check if request typpe is POST
if( method == 'POST'){
 const body = JSON.parse(event.body);
 console.log(body, typeof body);
// INCREASE rentscore of Movie by one
 if(body.rentMovieID){
  const updateResponse = await db.collection("av-movieDB").updateOne( { title:body.rentMovieID},{ $inc: { rentCount: 1 }});
  if(updateResponse["acknowledged"]== true && updateResponse["modifiedCount"]==1){
    // update was successful
    console.log(updateResponse);

    // update  user INFO table as well !
    //insert movie into userprofile DB
    console.log(body.useremail,typeof body.movieObj);
    const updateUserDetails = await db.collection("userDetails").updateOne({user:body.useremail},{$push:{rented:body.movieObj}},{upsert:true});

    const successResp = {
    statusCode: 200,
    body: JSON.stringify("update was successful!")
   };

  return successResp;

  }
    const errResp = {
    statusCode: 500,
    body: "error while udating! Retry!"
   };

  return errResp;


 }
}
// ADD _ID to the rented list in user-profile
};
