var secrets = require('../config/secrets');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var graph = require('fbgraph');
var _ = require('lodash');

/**
 * GET /api
 * 
 */
exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = function(req, res, next) {
  var token = _.find(req.user.tokens, { kind: 'facebook' });
  graph.setAccessToken(token.accessToken);
  async.parallel({
    getMe: function(done) {
      graph.get('/me/?fields=first_name', function(err, me) {
        //console.log(me);
        //console.log(me.first_name);
        done(err, me);
      });
    },
    getPosts: function(done) {
        listPosts = [];
        function getPosts(url) {
          graph.get(url, function(err, posts) {
          console.log(url);
          listPosts.push(posts.data);
          console.log(posts.data);
          if(posts.paging && posts.paging.next) {
            getPosts(posts.paging.next);
          } else {
            done(err, listPosts);
          }
        });
      }
      getPosts('/me/posts');
    },
    getOnePost: function(done) {
      graph.get('/me/posts/', function(err, onePost) {
        done(err, onePost.data);
      });
    },
    getMyFriends: function(done) {
      graph.get('/me/friends', function(err, friends) {
        done(err, friends.data);
      });
    }
  },
  function(err, results) {
    if (err) return next(err);
    res.render('api/facebook', {
      title: 'Facebook API',
      me: results.getMe,
      onePost: results.getOnePost,
      posts: results.getPosts,
      friends: results.getMyFriends,
      likes: results.getMyLikes
    });
  });
};
