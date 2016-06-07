var articles = [];

function Article (opts) {
// TODO: Use the object passed in to complete this constructor function:
  // Save ALL the properties of `opts` into `this`.
  this.title = opts.title;
  this.author = opts.author;
  this.category = opts.category;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();

  $newArticle.attr('data-category', this.category);
  $newArticle.find('h1').html(this.title);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('a').html(this.author);
  $newArticle.find('section.article-body').html(this.body);
  /* TODO: Now use jQuery to fill in the rest of the current
- template clone with properties from this particular Article instance.
- We need to fill in:
-  1. author name,
-  2. author url,
-  3. article title,
-  4. article body, and
-  5. publication date. */
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  $newArticle.append('<hr>');
  -  /* TODO: This cloned article is no longer a template,
-   as it now has real data attached to it! We need to account
-   for that and change it before this current article gets
-   rendered to our DOM. */
  $newArticle.removeClass('template');
  return $newArticle;
};

ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

-/* Now iterate through our transformed collection and instantiate
- a new Article instance for each object in our collection. */
ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

/* Append each Article to the DOM.
-NOTE: Remember that the '.toHtml' method invoked is one WE created. */
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
