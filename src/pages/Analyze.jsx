import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { saveAs } from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analyze() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      return <video className="w-xs md:w-md aspect-video rounded-md outline-2 outline-offset-6 outline-gray-400/30" src={url} controls />;
    }
    return <div className="w-max aspect-video bg-gray-600 rounded-md flex items-center justify-center text-white">No Thumbnail</div>;
  };

  // Function to make the API request for video analysis
  const analyzeVideo = async (file) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch('http://192.168.209.246:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Video analysis failed');
      }

      const analysisResult = await response.json();
      setResultData(analysisResult);
      setIsAnalyzed(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = () => {
    analyzeVideo(uploadedFile);
  };

  // Analyze another video
  const handleAnalyzeAnotherVideo = () => {
    setUploadedFile(null);
    setIsAnalyzed(false);
    setResultData(null);
  };

  // Download file name should be the 'analysis_report' + date + time + file type (.csv, .pdf, .txt)
  const date = new Date();
  const time = date.toLocaleTimeString();
  const downloadFileName = `analysis_report_${date.toISOString().split('T')[0]}_${time}`;

  const handleDownloadCSV = () => {
    const { average_score, confidence, accuracy_rate, media_type } = resultData;
    const data = [
      ['Metric', 'Value'],
      ['Deepfake Score', average_score.toFixed(4)],
      ['Confidence Level', confidence.toFixed(2)],
      ['Accuracy Rate', accuracy_rate.toFixed(2)],
      ['Media Type', media_type],
    ];
    const csvContent = data.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    saveAs(blob, `${downloadFileName}.csv`);
  };

  const handleDownloadTXT = () => {
    const { average_score, confidence, accuracy_rate, media_type } = resultData;

    const txtContent = `Deepfake Detection Report 
    
      Deepfake Score: ${average_score.toFixed(2)}%
      Confidence Level: ${confidence.toFixed(2)}%
      Accuracy Rate: ${accuracy_rate.toFixed(2)}%
      Media Type: ${media_type}

      This report was generated on ${date.toLocaleDateString()} at ${time}
    `;
    
    const blob = new Blob([txtContent], { type: 'text/plain' });

    saveAs(blob, `${downloadFileName}.txt`);
  };

  const handleDownloadPDF = () => {
    const { average_score, confidence, accuracy_rate, media_type } = resultData;
    
    const qrContent = `Deepfake Score: ${average_score.toFixed(2)}%, Confidence Level: ${confidence.toFixed(2)}%, Accuracy Rate: ${accuracy_rate.toFixed(2)}%`;
    
    const docDefinition = {
      content: [
        { text: 'Deepfake Detection Report', fontSize: 18, bold: true, margin: [0, 0, 0, 20] },
        { text: `Deepfake Score: ${average_score.toFixed(2)}%`, fontSize: 14 },
        { text: `Confidence Level: ${confidence.toFixed(2)}%`, fontSize: 14 },
        { text: `Accuracy Rate: ${accuracy_rate.toFixed(2)}%`, fontSize: 14 },
        { text: `Media Type: ${media_type}`, fontSize: 14 },
  
        { text: '', margin: [0, 20, 0, 0] },
        { text: 'QR Code for Analysis Data:', margin: [0, 10, 0, 10], fontSize: 14 },
        { qr: qrContent, fit: 150, margin: [0, 0, 0, 10] },
  
        { text: '', margin: [0, 20, 0, 0] },
        { text: 'Disclaimer: This report is for informational purposes only and should not be used as a substitute for professional advice.', fontSize: 12, italics: true },
  
        { text: '', margin: [0, 20, 0, 0] },
        { text: 'For more information, please visit our website.', fontSize: 12, italics: true },
        { text: 'Contact us at squadofcreators@gmail.com', fontSize: 12, italics: true },
  
        { text: '', margin: [0, 20, 0, 0] },
        { text: 'Copyright © 2025 Squad of Creators', fontSize: 12, italics: false },
      ],
    };
  
    pdfMake.createPdf(docDefinition).download(`${downloadFileName}.pdf`);
  };  
  

  // Displaying the chart based on backend results
  const chartData = resultData ? {
    labels: ['Video Analysis'],
    datasets: [
      {
        label: 'Deepfake Score',
        data: [resultData.average_score],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  } : {};

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Video Analysis Result',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Deepfake Score: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="h-full flex flex-col items-center bg-gray-900 text-white">
      {!uploadedFile && (
        <section className="mb-16 w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold mb-4">Upload Video for Analysis</h1>
          <div {...getRootProps()} className="flex flex-col items-center justify-center border-2 border-dashed border-blue-500 p-8 rounded-lg w-full max-w-md cursor-pointer">
            <input {...getInputProps()} id="video-upload" type="file" className="hidden" />
            <p className="text-xl">Drag & Drop or Click to Upload</p>
            <p className="text-sm mt-2 text-gray-400">Supported formats: MP4, AVI, MOV, MKV</p>
          </div>
        </section>
      )}

      {uploadedFile && !isAnalyzed && (
        <section className="mb-16 w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold mb-4">Uploaded Video</h1>
          {generateThumbnail(uploadedFile)}
          <p className="mt-4 text-base md:text-lg text-center">File: {uploadedFile.name}</p>
          <button onClick={handleAnalyze} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer" disabled={loading}>
            {loading ? 'Processing...' : 'Analyze Video'}
          </button>
        </section>
      )}

      {isAnalyzed && (
        <section className="mb-16 w-full h-full flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold mb-4">Video Results</h1>
          <div className='w-full flexex flex-col items-center justify-center gap-4 text-center'>
            <p className="text-lg">Deepfake Score: {resultData.average_score.toFixed(4)}%</p>
            <p className="text-lg">Confidence: {resultData.confidence.toFixed(2)}%</p>
          </div>

          {/* Display Bar Chart */}
          <div className="w-full max-w-lg mb-8">
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* Download Buttons */}
          <div className="flex gap-4">
            <button onClick={handleDownloadCSV} className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-pointer">
              Download CSV
            </button>
            <button onClick={handleDownloadTXT} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded cursor-pointer">
              Download TXT
            </button>
            <button onClick={handleDownloadPDF} className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer">
              Download PDF
            </button>
          </div>

          <button onClick={handleAnalyzeAnotherVideo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer">
            Analyze Another Video
          </button>
        </section>
      )}


      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default Analyze;
