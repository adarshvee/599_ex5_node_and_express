var express = require('express');
var router = express.Router();

router.get('/highlights', function(req, res) {
  var dataFile = req.app.get('appData');
  var pagePhotos = [];
  var pageHighlights = dataFile.data.highlights;
  dataFile.data.highlights.forEach(function(item) {
    pagePhotos = pagePhotos.concat(item.artwork);
  });
  res.render('highlights', {
    pageTitle: 'highlights',
    artwork: pagePhotos,
    highlights: pageHighlights,
    pageID: 'highlightList'
  });
});

router.get('/highlights/:highlightid', function(req, res) {
  var dataFile = req.app.get('appData');
  var pagePhotos = [];
  var pageHighlights = [];
  dataFile.data.highlights.forEach(function(item) {
    if (item.id == req.params.highlightid) {
      pageHighlights.push(item);
      pagePhotos = pagePhotos.concat(item.image);
    }
  });
  res.render('highlights', {
    pageTitle: 'Highlight Info',
    artwork: pagePhotos,
    highlights: pageHighlights,
    pageID: 'highlightDetail'
  });
});

router.get('/filterHighlights', function(req, res) {
  var dataFile = req.app.get('appData');
  var pageHighlights = [];
  var catSet = new Set();
  var selCatSet = new Set();
  dataFile.data.highlights.forEach(function(item) {
    catSet.add(item.category);

    if (req.query.filters == undefined || req.query.filters.length == 0 || req.query.filters.indexOf(item.category) >= 0) {
      selCatSet.add(item.category);
      pageHighlights.push(item);
    }
  });
  res.render('highlights', {
    pageTitle: 'Filter Highlight',
    highlights: pageHighlights,
    pageID: 'highlightFilter',
    categories: catSet,
    selectCategories : selCatSet
  });
});

module.exports = router;
