/**
<<<<<<< HEAD
 * Created by Josh on 11/20/15.
=======
 * Created by Josh on 11/17/15.
>>>>>>> 4779bf92bb40e61db83a3256bf5a45c754e24368
 */
$(document).ready(function() {
    $("#data-list .outerRow").click(function() {

        // Change the row's background color to show it was selected
        var row =  $(this)

        $("#data-list .outerRow").removeClass('rowHighlighted');
        var previousSelection = row.hasClass('rowHighlighted');
        if (!previousSelection) {
            row.toggleClass('rowHighlighted');
        }

        var tableRowID = row.attr('id');

        $.ajax({
            type: "POST",
            url: window.location.href + '/getRowDataForKey',
            dataType: "json",
            data: { 'pawprint' : tableRowID },
            success: function(returnData) {
                //ret_val = $.parseJSON(ret_val);
                //Information returned from controller to append to view
                //$("<div/>").append($("<h3/>", {text: ret_val['id']}));

                console.log(returnData);
                var employee = returnData['employee'];

                // Start loading the info into the form

                // These fields can not be edited
                document.getElementById("employeeName").innerHTML = employee['fName'] + " " + employee['lName'];
                document.getElementById("empID").innerHTML = employee['empID'];
                document.getElementById("pawprint").innerHTML = employee['pawprint'];

                // These fields can be edited
                document.querySelector('#formRequestID').value = employee['request']['request_ID'];
                document.querySelector('#title').value = employee['title'];
                document.querySelector('#phone_number').value = employee['phone_number'];
                document.querySelector('#campus_address').value = employee['campus_address'];

                // These fields are checkboxes for the access types
                var accessTypes = employee['request']['types'];
                var keys = accessTypes['keys'];

                // Reset the form. This makes setting values for an existing request easier
                // and if there is no request, all fields are blank for a new request to be made
                var form = document.querySelector("#SISrequestForm");
                var checkboxes = form.getElementsByTagName('input');
                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].type == 'checkbox') {
                        checkboxes[i].checked = false;
                    }
                }


                // Populate the form with the selected person's request data
                if (accessTypes['data'].length > 0) {

                    var data = accessTypes['data'][0]; // extract the data key/value array

                    // Loop through the keys and set the appropriate form values
                    for (var key in data) {
                        var field = data[key];
                        //console.log("key: " + key + "\tvalue: " + field);

                        var checkboxName = '';
                        checkboxes = [];

                        // Populate the corresponding checkbox(es)
                        switch (field) {
                            case "0": // view only - unchecked
                                // box is already unchecked
                                break;
                            case "1": // view only - checked
                            case "5": // both - only view checked
                                // Create the name of the checkbox
                                checkboxName = key + "_view";

                                break;
                            case "2": // update only - unchecked
                                // box is already unchecked
                                break;
                            case "3": // update only - checked
                            case "6": // both - only update checked
                                // Create the name of the checkbox
                                checkboxName = key + "_update";

                                break;
                            case "4": // both - unchecked
                                // box is already unchecked
                                break;
                            case "7": // both - both checked
                                // Create the name of the checkbox
                                checkboxName = key + "_view";

                                // update the view checkbox before
                                $('input[name="' + checkboxName + '"]').each( function() {
                                        $(this).prop('checked', true);
                                    }

                                );

                                checkboxName = key + "_update";
                                break;
                        }

                        $('input[name="' + checkboxName + '"]').each( function() {
                                $(this).prop('checked', true);
                            }

                        );

                    }

                }


            }

        });

    })

});