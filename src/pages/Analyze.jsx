import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone'; // Add this import for file drop functionality
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

function Analyze() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  // Handle file drop/upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*', 
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles[0]);
    }
  });

  const generateThumbnail = (file) => {
    if (file && file.type.startsWith('video')) {
      const url = URL.createObjectURL(file);
      return <video className="w-xs md:w-md aspect-video rounded-md outline-2 outline-offset-6 outline-gray-400/30 " src={url} controls />;
    }
    return <div className="w-max aspect-video bg-gray-600 rounded-md flex items-center justify-center text-white">No Thumbnail</div>;
  };

  // Example graph data for analysis results
  const barChartData = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        label: 'Detection Confidence',
        data: [65, 59, 80, 81],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const lineChartData = {
    labels: ['Time 1', 'Time 2', 'Time 3', 'Time 4', 'Time 5'],
    datasets: [
      {
        label: 'Accuracy Over Time',
        data: [60, 70, 80, 85, 90],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="h-full flex flex-col items-center bg-gray-900 text-white">
      {/* Video Upload Section */}
      {!uploadedFile && (
        <section className="mb-16 w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold mb-4">Upload Video for Analysis</h1>
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center border-2 border-dashed border-blue-500 p-8 rounded-lg w-full max-w-md cursor-pointer"
          >
            <input {...getInputProps()} id="video-upload" type="file" className="hidden" />
            <p className="text-xl">Drag & Drop or Click to Upload</p>
            <p className="text-sm mt-2 text-gray-400">Supported formats: MP4, AVI, MOV, MKV</p>
          </div>
        </section>
      )}

      {/* Display Uploaded File's Thumbnail and Name */}
      {uploadedFile && !isAnalyzed && (
        <section className="mb-16 w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold mb-4">Uploaded Video</h1>
          {generateThumbnail(uploadedFile)}
          <p className="mt-4 text-base md:text-lg text-center">File: {uploadedFile.name}</p>
        </section>
      )}

      {/* Video Analysis Section */}
      {uploadedFile && !isAnalyzed && (
        <section className="mb-16 w-full h-full flex flex-col items-center justify-center gap-4">
          <p className="text-lg text-gray-400 mt-3">Uploaded video is ready for analysis.</p>
          <button
            onClick={() => setIsAnalyzed(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer"
          >
            Analyze Video
          </button>
        </section>
      )}

      {/* Video Results Section (after analysis) */}
      {isAnalyzed && (
        <section className="mb-16 w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold mb-4">Video Results</h1>
          <p className="text-lg mb-4">Analysis complete. Results are shown below:</p>

          <div className='flex flex-col lg:flex-row items-center justify-center gap-8'>
            {/* Bar Chart */}
            <div className="w-full max-w-lg mb-8">
              <Bar data={barChartData} />
            </div>

            {/* Line Chart */}
            <div className="w-full max-w-lg mb-8">
              <Line data={lineChartData} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Analyze;
