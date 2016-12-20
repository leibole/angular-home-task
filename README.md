# angular-home-task
Pictures gallery written in angular

The task can also be found on plunker: http://plnkr.co/edit/vlT8VkeeivoBYxhfcJ1r?p=preview

# Task description

You should use Angular but you can use any other libraries you find necessary. However, the libraries that you use should be written as an angular plugins.
 
We give some extra points for design and animations. :)
 
Angular Gallery Plugin
Use the given JSON feed to create a gallery application using AngularJS.  
the gallery should be written as a directive that can be implement in any angular project.  
the signature of your directive should be <my-gallery></my-gallery>  
requirements:  
the gallery needs to work from within an independent directive (plugin).  
the directive receives the following params and renders the gallery accordingly:  
feed (String/Array) - path to load the json from / array of images  
search (Boolean default:true) - show a search box  
pagination (Boolean default true) - show a pagination component in the gallery.  
results-per-page (Number, default 10) - number of results on each page of the gallery  
sorting (Boolean default true) - allow the user to sort by the images elements (title, date)  
auto-rotate-time (Number default 4) - Time for image slideshow mode  
The gallery should have the following controls:  
Pagination.  
Search input box.  
Sort by dropdown.  
Items per page drop-down. (5, 10, 15 or 20 results Default to 10).  
Slideshow - show the user a slideshow of the images that auto rotates according to the given time in the auto-rotate-time attribute  
when clicking an image show a larger view (modal) of the picture with next/prev controls.  
using localStorage, enable the user to “delete” an image by adding it to a blacklist.  
The gallery should handle unavailable images and show a placeholder instead (there are 2 false images in the given feed, they will return a 304 status).  
 
Example usage of the directive:  
<my-gallery feed=”’path/to/feed.json’” search=”true” items-per-page=”15”></my-gallery>  
