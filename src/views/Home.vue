<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getUser_API, getUser_DEFAULT, type UserModel } from "@/service/users";

const _user = ref<UserModel>(getUser_DEFAULT());
async function getUser() {
	const [response, error] = await getUser_API(_user.value);

	if (error) return;
	_user.value = response;
}

onMounted(() => {
	getUser();
});
</script>

<template>
	<div>Salom!</div>
	<div>
		{{ _user }}
	</div>
</template>
