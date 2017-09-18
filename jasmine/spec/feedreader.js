/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // A test that loops through each of the feeds in the allFeeds object
        // and ensures that it has a well defined URL which is not empty
        it('URLs are defined and are not empty', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                // Keep in mind that null is a particular value
                expect(allFeeds[i].url).not.toBe('');
            }
         });

        // Test that helps to loop through each feed in the allFeeds object
        // and helps in ensuring that it has a defined name which is not empty
        it('Names are defined and not empty', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
         });
    });


    // A new test named as 'THE MENU'
    describe('THE MENU', function() {

        // Test that ensures the menu/navbar is hidden by default
        it('Should be hidden', function() {
            var x = document.getElementsByTagName("body")[0];
            console.log(x.className);
            expect($(document.body).hasClass('menu-hidden')).not.toBe(false);
        });

        // Test that will change the visibility of the menu icon, when clicked
        // It will hide if you click it the second time
        it('Visibility should be switched', function() {
            var x = document.getElementsByTagName("body")[0];
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass("menu-hidden")).not.toBe(true);
            menuIcon.click();
            expect($('body').hasClass("menu-hidden")).not.toBe(false);
        });
    });

    // A new suite named as 'INITIAL ENTRIES'
    describe('INITIAL ENTRIES', function() {
        // Loads our first feed
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Checks whether the feed item located in the article.entry,
        // is actually there or not
        it('atleast one article in the feed container', function() {
            expect($('.feed article.entry').length).toBeGreaterThan(0);
        });
    });

    // A new test suite named as 'NEW FEED SELECTION'
    describe('NEW FEED SELECTION', function() {

        // We created two different feeds variables
        var firstFeed;
        var secondFeed;

        // Helps to load the initial feed(s)
        beforeEach(function(done) {
            loadFeed(1, function() {
                firstFeed = $('.feed').html();
                done();
            });
        });

        // Now, finally we cross check with Jasmine that both of our loaded feeds
        // are same or different
        it('new feed is loaded', function(done) {
            loadFeed(2, function() {
                secondFeed = $('.feed').html();
                expect(firstFeed).not.toEqual(secondFeed);
                done();
            });
        });
    });

}());
