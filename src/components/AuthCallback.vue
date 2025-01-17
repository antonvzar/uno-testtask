<template>
  <div>
    <h1>Авторизация</h1>
    <p v-if="error">{{ error }}</p>
    <p v-if="loading">Загрузка...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      loading: true,
    };
  },
  mounted() {
    const query = new URLSearchParams(window.location.search);

    // Проверка на наличие ошибки
    if (query.get("error")) {
      this.error = query.get("error_description") || "Ошибка авторизации";
      this.loading = false;
      return;
    }

    // Получение кода и device_id
    const code = query.get("code");
    const deviceId = query.get("device_id");

    if (code && deviceId) {
      // Обмен кода на токен
      this.exchangeCodeForToken(code, deviceId);
    } else {
      this.error = "Неправильный ответ от ВКонтакте";
      this.loading = false;
    }
  },
  methods: {
    async exchangeCodeForToken(code, deviceId) {
      try {
        const response = await window.VKIDSDK.Auth.exchangeCode(code, deviceId);
        const token = response.token;

        // Сохранение токена в localStorage (или Vuex/Pinia)
        localStorage.setItem("vk_token", token);

        // Перенаправление на страницу со списком друзей
        this.$router.push("/friends");
      } catch (error) {
        console.error("Ошибка обмена кода на токен:", error);
        this.error = "Ошибка получения токена";
        this.loading = false;
      }
    },
  },
};
</script>
