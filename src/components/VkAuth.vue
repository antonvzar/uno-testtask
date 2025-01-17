<template>
  <div id="vk-auth">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else id="vk-floating-login"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null, // Хранит текст ошибки
    };
  },
  mounted() {
    if (window.VKIDSDK) {
      const VKID = window.VKIDSDK;

      // Инициализация SDK
      VKID.Config.init({
        app: 52922018, // Ваш App ID
        redirectUrl: "https://antonvzar.github.io/", // Ваш редирект URL
        responseMode: VKID.ConfigResponseMode.Callback,
        source: VKID.ConfigSource.LOWCODE,
        scope: "", // Укажите нужные доступы
      });

      // Создание Floating One Tap
      const floatingOneTap = new VKID.FloatingOneTap();

      floatingOneTap
        .render({
          appName: "uno-testtask",
          showAlternativeLogin: true,
        })
        .on(VKID.WidgetEvents.ERROR, this.handleError)
        .on(VKID.FloatingOneTapInternalEvents.LOGIN_SUCCESS, (payload) => {
          const code = payload.code;
          const deviceId = payload.device_id;

          // Обмен кода на токен
          VKID.Auth.exchangeCode(code, deviceId)
            .then(this.handleSuccess)
            .catch(this.handleError);
        });

      // Сохранение экземпляра для управления (если нужно)
      this.floatingOneTap = floatingOneTap;
    } else {
      this.error = "VKIDSDK не найден";
    }
  },
  methods: {
    handleSuccess(data) {
      console.log("Успешный вход:", data);
      if (this.floatingOneTap) {
        this.floatingOneTap.close(); // Закрыть виджет после успешного входа
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
  margin: 10px 0;
}
</style>
