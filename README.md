Backend is running on port 3000
frontend can request to http://localhost:3000/admin/upload as a post request to upload the excel file
the form should have enctype="multipart/form-data"
and the name attribute of the file input should be 'file'
it returns json which has all the parsed data from the excel file
