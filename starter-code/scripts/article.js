var articles = [];

function Article (opts) {
  // TODO: Use the object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  //DONE------------------------------------------->
  this.author = opts.author;
  this.title = opts.title;
  this.category = opts.category;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

// Define a method on the Article prototype
Article.prototype.toHtml = function(){
  var $newArticle = $('article.template').clone(); //ONLY articles with the class of template will be selected. If there were a space between the article and .template, it would select article and it's siblings.
  $newArticle.attr('data-category', this.category);
  $newArticle.find('h1').html(this.title);
  $newArticle.find('a').html(this.author);
  $newArticle.find('.article-body').html(this.body);

  /* TODO: Now use jQuery to fill in the rest of the current
  template clone with properties from this particular Article instance.
  We need to fill in:
   1. author name,
   2. author url,
   3. article title,
   4. article body, and
   5. publication date. */

  // Display the date as a relative number of "days ago":
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').html('about' + parseInt((new Date() - new Date (this.publishedOn)) /60/60/24/1000) + ' days ago');

  /* TODO: This cloned article is no longer a template,
   as it now has real data attached to it! We need to account
   for that and change it before this current article gets
   rendered to our DOM. */
  $newArticle.removeClass('template');
  return $newArticle;
};

// Sort our data by date published, descending order
ourLocalData.sort(function(a, b) {
  return (new Date(b.publishedOn)) - new Date(a.publishedOn);
});
/* Now iterate through our transformed collection and instantiate
 a new Article instance for each object in our collection. */

ourLocalData.forEach(function(ele) {  /*forEach runs through every element with no breakout like a for loop*/
  articles.push(new Article(ele));
  console.log('test');
});

/* Append each Article to the DOM.
NOTE: Remember that the '.toHtml' method invoked is one WE created. */
articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
  // console.log(articles);
});
