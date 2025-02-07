Backend is running on port 3000
frontend can request to http://localhost:3000/admin/menu (changed from upload to maintain restful routing) as a post request to upload the menu
the form should have enctype="multipart/form-data"
and the name attribute of the file input should be 'file'
it returns json having data {"success":true,"message":"Menu created successfully","data":{"menuId":"67a5a5333225995b8c2f247a","startDate":"2025-01-12T18:30:00.000Z","endDate":"2025-01-26T18:29:59.999Z"}}
if it was uploaded successfully.
the error is handled in a generic manner for now.
Also we have a get route to http://localhost:3000/admin/menu to get the current active menu
