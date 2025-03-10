import React, { useState } from 'react'

const UploadMenu = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [showStatus, setShowStatus] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadStatus('')
    setShowStatus(true)
    
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await fetch('api/admin/menu', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setUploadStatus('success')
        setSelectedFile(null)
      } else {
        setUploadStatus('error')
      }
    } catch (error) {
      setUploadStatus('error')
    } finally {
      setIsUploading(false)
    }
  }

  const getStatusMessage = () => {
    if (!showStatus) return null
    
    if (uploadStatus === 'success') {
      return (
        <div className="mb-4 p-4 rounded bg-green-100 text-green-700 flex items-center justify-between">
          <div className="flex items-center">
            {/* <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg> */}
            Menu uploaded successfully!
          </div>
          <button 
            onClick={() => setShowStatus(false)}
            className="text-green-700 hover:text-green-900"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )
    }
    if (uploadStatus === 'error') {
      return (
        <div className="mb-4 p-4 rounded bg-red-100 text-red-700 flex items-center justify-between">
          <div className="flex items-center">
            {/* <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg> */}
            Upload failed. Please try again.
          </div>
          <button 
            onClick={() => setShowStatus(false)}
            className="text-red-700 hover:text-red-900"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )
    }
    return null
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = () => {
    setIsDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.xlsx')) {
      setSelectedFile(file)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.name.endsWith('.xlsx')) {
      setSelectedFile(file)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Upload Menu</h1>
      
      {getStatusMessage()}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            name="file"
            accept=".xlsx"
            onChange={handleFileSelect}
            className="hidden"
            id="fileInput"
          />
          <label 
            htmlFor="fileInput"
            className="cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex justify-center">
                <svg 
                  className="w-12 h-12 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {selectedFile ? (
                  <span>{selectedFile.name}</span>
                ) : (
                  <span>Drag and drop your XLSX file here or click to browse</span>
                )}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Only .xlsx files are supported
              </div>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            'Upload Menu'
          )}
        </button>
      </form>
    </div>
  )
}

export default UploadMenu