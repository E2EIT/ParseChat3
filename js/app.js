/**
 * File:
 * Created by RProctor on 7/22/2015.
 * Purpose: This is main Angular application file. It loads all of the modules needed by
 * the application and establishes the routes.
 *
 * Updates Date:
 * Updates Coder:
 * Changes:
 * .
 * .
 *
 */

'use strict';

var parseID 		=	'r9UWiYeUYcldnMREUH7O76qfqpXrREmGoTJgQzPm';
var parseRestKey 	= 	'dPin07NxKY7RPc6AFowAZzf6UbdRVZMNMSAX9Uhd';

$(document).ready(function() {
	getMessages();
	$("#send").click(function() {
		var username	= $('input[name=username]').attr('value');
		var message 	= $('input[name=message]').attr('value');
		console.log(username);
		console.log('!.');
		$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard/',
			headers: {
				'X-Parse-Application-Id': parseID,
				'X-Parse-REST-API-Key': parseRestKey
			},
			contentType: 'application/json',
			dataType: 'json',
			processData: false,
			data: JSON.stringify({
				'username': username,
				'message': message
			}),
			type: 'POST',
			success: function() {
				console.log('sent');
				getMessages();
			},
			error: function() {
				console.log('error');
			}
		});
	});

	function getMessages() {
		$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard',
			headers: {
				'X-Parse-Application-Id': parseID,
				'X-Parse-REST-API-Key': parseRestKey
			},
			contentType: 'application/json',
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				console.log('get');
				updateView(data);
			}
		});
	}

	function updateView(messages) {
		var table = $('.table tbody');
		table.html('');
		$.each(messages.results, function (index, value) {
			var trEl =
				$('<tr><td>'
				+ value.username
				+ '</td><td>'
				+ value.message
				+ '</td><tr>');
			table.append(trEl);
		});
		console.log(messages);
	}
});