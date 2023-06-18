<template>
	<div>
		<DashboardCard>
			<div class="flex justify-between items-start mb-1">
				<h1 class="text-xs uppercase font-extrabold">Personal Information</h1>
				<button class="text-xs py-2.5 px-6 rounded-full bg-normalBlue text-white uppercase"
					@click="editInfo = true">
					Edit
				</button>
			</div>

			<div>
				<div class="flex justify-between items-end mb-5">
					<div v-if="!$auth.user.avatar_url">
						<label for="file-input" class="cursor-pointer">
							<div class="w-16 h-16 relative rounded-full">
								<div>
									<img src="@/assets/img/pages/dashboard/settings/camera.png"
										class="w-full h-full rounded-full" />
								</div>
							</div>
						</label>
						<input id="file-input" class="hidden" type="file" accept="image/*" @change="uploadImage" />
					</div>
					<div v-else>
						<div class="w-16 h-16 relative rounded-full">
							<div>
								<img :src="$auth.user.avatar_url" class="w-full h-full rounded-full" />
							</div>
							<label for="file-input" class="cursor-pointer absolute bottom-0 right-0">
								<svg width="27" height="24" viewBox="0 0 27 24" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M9.9826 0.863281C8.46875 0.863281 7.16371 1.88091 6.86541 3.29376L6.60689 4.49835H3.36541C1.60795 4.49835 0.183594 5.85439 0.183594 7.52757V20.2503C0.183594 21.9235 1.60795 23.2795 3.36541 23.2795H23.729C25.4865 23.2795 26.9109 21.9235 26.9109 20.2503V7.52757C26.9109 5.85439 25.4865 4.49835 23.729 4.49835H20.4876L20.229 3.29376C19.9307 1.87854 18.6257 0.863281 17.1119 0.863281H9.9826ZM9.9826 2.07497H17.1119C18.0167 2.07497 18.8047 2.68791 18.9837 3.53278L19.2372 4.73737C19.359 5.30298 19.881 5.71003 20.4876 5.71003H23.729C24.7805 5.71003 25.6381 6.5265 25.6381 7.52757V20.2503C25.6381 21.2514 24.7805 22.0678 23.729 22.0678H3.36541C2.31392 22.0678 1.45632 21.2514 1.45632 20.2503V7.52757C1.45632 6.5265 2.31392 5.71003 3.36541 5.71003H6.60689C7.21342 5.71003 7.73544 5.30298 7.85724 4.73737L8.11079 3.53278C8.28977 2.68791 9.07777 2.07497 9.9826 2.07497ZM13.5472 7.52757C10.0323 7.52757 7.18359 10.2397 7.18359 13.586C7.18359 16.9323 10.0323 19.6444 13.5472 19.6444C17.0621 19.6444 19.9109 16.9323 19.9109 13.586C19.9109 10.2397 17.0621 7.52757 13.5472 7.52757ZM13.5472 8.73925C16.3537 8.73925 18.6381 10.9141 18.6381 13.586C18.6381 16.2579 16.3537 18.4328 13.5472 18.4328C10.7408 18.4328 8.45632 16.2579 8.45632 13.586C8.45632 10.9141 10.7408 8.73925 13.5472 8.73925Z"
										fill="#70BAC9" />
								</svg>
							</label>
						</div>
						<input id="file-input" class="hidden" type="file" accept="image/*" @change="uploadImage" />
					</div>
					<div>
						<p class="text-xs font-semibold cursor-pointer uppercase mb-2 pb-px border-b border-blackish"
							@click="isUpdatePassword = true">
							Change Password
						</p>
					</div>
				</div>
				<div v-if="$auth.user">
					<div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3 mt-2">
						<p>First and last name</p>
						<p class="font-semibold">
							{{ $auth.user.name && $auth.user.surname ? $auth.user.name + ' ' + $auth.user.surname : ''
							}}
						</p>
					</div>
					<div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3 mt-2">
						<p>Email</p>
						<p class="font-semibold">{{ $auth.user.email ? $auth.user.email : '' }}</p>
					</div>
					<div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3 mt-2">
						<p>Phone number</p>
						<p class="font-semibold">{{ $auth.user.phone_code && $auth.user.phone ? $auth.user.phone_code +
								' ' + $auth.user.phone : ''
						}}</p>
					</div>
				</div>
			</div>
		</DashboardCard>

		<!-- UPDATE PASSWORD MODAL -->
		<template v-if="isUpdatePassword">
			<UpdatePasswordModal @toggle="() => isUpdatePassword = !isUpdatePassword" />
		</template>

		<!-- EDIT INFO MODAL -->
		<template v-if="editInfo">
			<UpdateInfoModal @toggle="() => editInfo = !editInfo" />
		</template>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import UpdatePasswordModal from './update-password-modal.vue';
import UpdateInfoModal from './update-info-modal.vue';

export default {
	components: {
		UpdatePasswordModal,
		UpdateInfoModal
	},

	data: () => ({
		isUpdatePassword: '',
		editInfo: '',
		upload: false
	}),
	methods: {
		...mapActions({
			UPLOAD_PROFILE_AVATAR: 'settings/UPLOAD_PROFILE_AVATAR',
			FETCH_USER: "authentication/FETCH_USER",
		}),
		uploadImage({ target: { files } }) {
			const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
			if (!(acceptedImageTypes.includes(files['0'].type))) {
				this.$toast.error({
					title: "Upload Error",
					message: "Given image format is not accepted",
				});
			}
			else {
				let formData = new FormData();
				formData.append('avatar', files['0'])
				this.UPLOAD_PROFILE_AVATAR({ form: formData })
					.then((response) => {
						this.FETCH_USER()
						this.$toast.success({
							title: "Profile Picture uploaded",
							message: "Your picture has been successfully uploaded",
						});
					})
					.catch((error) => {
						this.$toast.error({
							title: "Error",
							message: error.message,
						});
					});
			}
		}

	},
};
</script>
