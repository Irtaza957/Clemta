import folderIcon from "@/assets/img/pages/dashboard/documents/icons/file.svg";
import pdfIcon from "@/assets/img/pages/dashboard/documents/icons/pdf.svg";
import wordIcon from "@/assets/img/pages/dashboard/documents/icons/docx.svg";
import excelIcon from "@/assets/img/pages/dashboard/documents/icons/xls.svg";
import imageIcon from "@/assets/img/pages/dashboard/documents/icons/png.svg";

export default {
	methods: {
		getIcon(document) {
			if (document.type === "folder") {
				return folderIcon;
			} else if (document.type === "file") {
				switch (document.extension) {
					case ".pdf":
						return pdfIcon;
					case ".docx":
						return wordIcon;
					case ".xls":
					case ".csv":
					case ".xlsx":
						return excelIcon;
					case ".png":
					case ".jpg":
					case ".jpeg":
						return imageIcon;
					default:
						return wordIcon;
				}
			}
		},
	},
};
