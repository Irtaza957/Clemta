import Vue from "vue";
import Container from "../components/ui/Container.vue";
import DashboardCard from "../components/ui/dashboard-card";
import DashboardModal from "../components/ui/dashboard-modal";
import DashboardButton from "../components/ui/dashboard-button";
import FolderSkeleton from "../components/ui/folder-skeleton";
import NotFound from "../components/ui/not-found"
import IssueSkeleton from "../components/ui/issue-skeleton"
import Loader from "../components/ui/loader"
import FilePreviewModal from "../components/ui/file-preview-modal.vue"

const components = { Container, DashboardCard, DashboardModal, DashboardButton, FolderSkeleton, NotFound , IssueSkeleton, Loader, FilePreviewModal}

Object.entries(components).forEach(([name, component]) => {
	Vue.component(name, component)
})