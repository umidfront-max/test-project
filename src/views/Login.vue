<template>
	<div class="login-page">
		<div class="login-card">
			<h2 class="title">Login</h2>

			<form @submit.prevent="handleLogin" class="login-form">
				<div class="form-group">
					<label for="username">Username</label>
					<input
						type="text"
						id="username"
						v-model="_formData.username"
						placeholder="Enter username"
						required
					/>
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input
						type="password"
						id="password"
						v-model="_formData.password"
						placeholder="Enter password"
						required
					/>
				</div>

				<button type="submit" class="btn-login" :disabled="loading">
					{{ loading ? "Logging in..." : "Login" }}
				</button>

				<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
			</form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
	singIn_API,
	type LoginModel,
	getLogin_DEFAULT,
	_TOKEN,
	_REFRESH_TOKEN,
} from "../service/auth";

const _formData = ref<LoginModel>(getLogin_DEFAULT());
const loading = ref(false);
const errorMessage = ref("");
const router = useRouter();

const handleLogin = async () => {
	errorMessage.value = "";
	loading.value = true;

	try {
		const [response, error] = await singIn_API(_formData.value);

		if (error || !response) {
			errorMessage.value = "Login failed. Check credentials.";
			return;
		}
		_TOKEN.value = response.tokenBody;
		_REFRESH_TOKEN.value = response.refreshToken;

		router.push("/");
	} catch (err: any) {
		console.error(err);
		errorMessage.value =
			err.response?.data?.message || "Login failed. Check credentials.";
	} finally {
		loading.value = false;
	}
};
</script>

<style lang="scss" scoped>
.login-page {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background: #f0f4f8;

	.login-card {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		width: 360px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

		.title {
			text-align: center;
			font-size: 1.5rem;
			margin-bottom: 1.5rem;
			color: #001e24;
		}

		.login-form {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.form-group {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				label {
					font-weight: 600;
					color: #333;
				}

				input {
					padding: 0.5rem 0.75rem;
					border: 1px solid #ccc;
					border-radius: 6px;
					font-size: 1rem;
					&:focus {
						outline: none;
						border-color: #00c4ff;
						box-shadow: 0 0 0 2px rgba(0, 196, 255, 0.2);
					}
				}
			}

			.btn-login {
				padding: 0.75rem;
				background-color: #00c4ff;
				color: white;
				font-weight: 600;
				border: none;
				border-radius: 6px;
				cursor: pointer;
				transition: 0.2s;

				&:hover:not(:disabled) {
					background-color: #00a1cc;
				}

				&:disabled {
					cursor: not-allowed;
					opacity: 0.7;
				}
			}

			.error {
				color: #e74c3c;
				font-size: 0.875rem;
				text-align: center;
			}
		}
	}
}
</style>
