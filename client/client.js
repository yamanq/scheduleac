Meteor.subscribe('schedule');

Template.client.rendered=function() {
	today = new Date()
    $('#date').datepicker({
    	startDate: today.toLocaleDateString(),
    	orientation: "top auto",
    	daysOfWeekDisabled: "0,6",
    	autoclose: true,
    	todayHighlight: true
	});
}




Template.client.helpers({


	status_class: function() {
    return statusmap[this.status];
  } 


})

Template.client.events({
	"click button": function() {
		pre = document.getElementById("date").value;
		document.getElementById("date").value = "";
		post = document.getElementById('post').value;
		Meteor.call('add_button', this, pre, post);
	}
})