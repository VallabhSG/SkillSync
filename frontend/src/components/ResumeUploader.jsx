import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUpload, FiFile, FiX, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";

const ResumeUploader = ({ onResumeExtracted }) => {
  const [file, setFile] = useState(null);
  const [extracting, setExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      extractResumeData(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    maxSize: 5242880, // 5MB
  });

  const extractResumeData = async (file) => {
    setExtracting(true);

    try {
      let text = "";

      // For text files, we can read directly
      if (file.type === "text/plain") {
        text = await file.text();
      } else if (file.type === "application/pdf") {
        // For PDF files, use a more robust extraction method
        try {
          const formData = new FormData();
          formData.append("file", file);

          // Try using PDF.js library if available
          const pdfjsLib = window["pdfjs-dist/build/pdf"];
          if (pdfjsLib) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer })
              .promise;
            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item) => item.str)
                .join(" ");
              fullText += pageText + "\n";
            }
            text = fullText;
          } else {
            // Fallback: Read PDF as binary and extract visible text
            const reader = new FileReader();
            text = await new Promise((resolve, reject) => {
              reader.onload = async (e) => {
                const arrayBuffer = e.target.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                let extractedText = "";

                // Convert bytes to string and extract readable text
                const decoder = new TextDecoder("utf-8", { fatal: false });
                const rawText = decoder.decode(uint8Array);

                // Extract text between common PDF text markers
                const textPatterns = [
                  /\(([^)]{2,})\)/g, // Text in parentheses
                  /\[([^\]]{2,})\]/g, // Text in brackets
                ];

                for (const pattern of textPatterns) {
                  const matches = rawText.matchAll(pattern);
                  for (const match of matches) {
                    extractedText += match[1] + " ";
                  }
                }

                // Also try to extract plain visible ASCII text
                const asciiText = rawText.replace(/[^\x20-\x7E\n]/g, "");
                extractedText += " " + asciiText;

                resolve(extractedText.trim() || rawText);
              };
              reader.onerror = reject;
              reader.readAsArrayBuffer(file);
            });
          }
        } catch (pdfError) {
          console.error("PDF extraction error:", pdfError);
          toast.warning(
            "PDF extraction had issues. Please try a TXT file for best results.",
            {
              position: "top-right",
            },
          );
        }
      }

      // Extract skills using common tech keywords
      const skillKeywords = [
        "Java",
        "Python",
        "JavaScript",
        "TypeScript",
        "React",
        "Angular",
        "Vue",
        "Node.js",
        "Node",
        "Spring Boot",
        "Spring",
        "Django",
        "Flask",
        "Express",
        "SQL",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "NoSQL",
        "Docker",
        "Kubernetes",
        "K8s",
        "AWS",
        "Azure",
        "GCP",
        "Google Cloud",
        "Git",
        "GitHub",
        "GitLab",
        "CI/CD",
        "Jenkins",
        "Agile",
        "Scrum",
        "HTML",
        "CSS",
        "SCSS",
        "Sass",
        "REST API",
        "GraphQL",
        "Microservices",
        "Machine Learning",
        "ML",
        "Data Science",
        "AI",
        "TensorFlow",
        "PyTorch",
        "PHP",
        "Ruby",
        "Go",
        "Rust",
        "C++",
        "C#",
        ".NET",
        "Swift",
        "Kotlin",
        "Linux",
        "Unix",
        "Bash",
        "Shell",
        "PowerShell",
        "Tailwind",
        "Bootstrap",
        "Material-UI",
        "Redux",
        "Next.js",
        "Nest.js",
      ];

      const textLower = text.toLowerCase();
      const foundSkills = skillKeywords.filter((skill) => {
        const skillLower = skill.toLowerCase();
        // Check for whole word matches to avoid false positives
        const regex = new RegExp(`\\b${skillLower}\\b`, "i");
        return regex.test(textLower);
      });

      // Remove duplicates and similar skills
      const uniqueSkills = [...new Set(foundSkills)];

      // Extract email using regex
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      const emails = text.match(emailRegex);

      // Extract phone numbers
      const phoneRegex =
        /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
      const phones = text.match(phoneRegex);

      // Extract years of experience (multiple patterns)
      let yearsOfExperience = 0;
      const experiencePatterns = [
        /(\d+)\s*(?:years?|yrs?)\s*(?:of\s*)?(?:experience|exp)/gi,
        /experience[:\s]+(\d+)\s*(?:years?|yrs?)/gi,
        /(\d+)\+?\s*(?:years?|yrs?)/gi,
      ];

      for (const pattern of experiencePatterns) {
        const matches = text.match(pattern);
        if (matches && matches.length > 0) {
          const numbers = matches[0].match(/\d+/);
          if (numbers) {
            yearsOfExperience = Math.max(
              yearsOfExperience,
              parseInt(numbers[0]),
            );
          }
        }
      }

      // Extract name (usually at the top of resume)
      const lines = text.split("\n").filter((line) => line.trim().length > 0);
      let extractedName = "";
      if (lines.length > 0) {
        // First non-empty line is often the name
        const firstLine = lines[0].trim();
        // Check if it looks like a name (no special chars, reasonable length)
        if (firstLine.length < 50 && /^[a-zA-Z\s.]+$/.test(firstLine)) {
          extractedName = firstLine;
        }
      }

      const extracted = {
        skills: uniqueSkills,
        email: emails ? emails[0] : "",
        phone: phones ? phones[0] : "",
        yearsOfExperience,
        name: extractedName,
        rawText: text.substring(0, 500), // First 500 chars for debugging
      };

      setExtractedData(extracted);
      onResumeExtracted(extracted);

      if (uniqueSkills.length > 0) {
        toast.success(`Found ${uniqueSkills.length} skills in your resume!`, {
          position: "top-right",
        });
      } else {
        toast.warning("No skills detected. Please enter them manually.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error extracting resume data:", error);
      toast.error(
        "Could not extract text from file. Please try a .txt file or enter data manually.",
        {
          position: "top-right",
        },
      );

      // Even on error, let user continue
      setExtractedData({
        skills: [],
        email: "",
        phone: "",
        yearsOfExperience: 0,
        name: "",
      });
    } finally {
      setExtracting(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setExtractedData(null);
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          {...getRootProps()}
          className={`border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-primary-500 bg-primary-50"
              : "border-gray-300 hover:border-primary-400 bg-white"
          }`}
        >
          <input {...getInputProps()} />
          <motion.div
            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <FiUpload className="mx-auto text-5xl text-primary-600 mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium text-primary-600">
                Drop your resume here...
              </p>
            ) : (
              <div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drag & drop your resume here
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  or click to browse (PDF or TXT - Max 5MB)
                </p>
                <p className="text-xs text-orange-600 bg-orange-50 rounded px-3 py-2 inline-block">
                  💡 Tip: TXT files work best for skill extraction
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {file && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <FiFile className="text-3xl text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <FiX className="text-2xl" />
          </button>
        </motion.div>
      )}

      {extracting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center"
        >
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full"
            />
            <p className="text-gray-600">Analyzing your resume...</p>
          </div>
        </motion.div>
      )}

      {extractedData && !extracting && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-gradient space-y-4"
        >
          <div className="flex items-center space-x-2 text-green-600 mb-4">
            <FiCheck className="text-2xl" />
            <h3 className="text-lg font-semibold">Resume Analyzed!</h3>
          </div>

          {extractedData.name && (
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Detected Name:</h4>
              <p className="text-lg font-semibold text-primary-600">
                {extractedData.name}
              </p>
            </div>
          )}

          {extractedData.skills.length > 0 ? (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Found {extractedData.skills.length} Skills:
              </h4>
              <div className="flex flex-wrap gap-2">
                {extractedData.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="badge-primary"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                ⚠️ No skills detected. Try uploading a .txt version of your
                resume or enter skills manually below.
              </p>
            </div>
          )}

          {extractedData.yearsOfExperience > 0 && (
            <div>
              <h4 className="font-medium text-gray-700">
                Estimated Experience:
              </h4>
              <p className="text-2xl font-bold text-primary-600">
                {extractedData.yearsOfExperience} years
              </p>
            </div>
          )}

          {extractedData.email && (
            <div>
              <h4 className="font-medium text-gray-700">Email:</h4>
              <p className="text-sm text-gray-600">{extractedData.email}</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              ✅ Data has been added to your profile form. Please review and
              edit as needed.
            </p>
          </div>
        </motion.div>
      )}

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-900 mb-2">
          📝 For Best Results:
        </h4>
        <ul className="space-y-1 text-sm text-purple-800">
          <li>• Use a plain text (.txt) resume file</li>
          <li>
            • List your skills clearly (e.g., "Skills: Java, Python, React")
          </li>
          <li>• Include "X years of experience" in your resume</li>
          <li>• Keep file size under 5MB</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeUploader;
