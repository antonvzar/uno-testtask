<template>
  <div>
    <h1>Список друзей</h1>
    <ul>
      <li v-for="friend in friends" :key="friend.id" class="friend">
        <img :src="friend.photo_100" alt="Фото друга" />
        <div>
          <p>{{ friend.first_name }} {{ friend.last_name }}</p>
          <p>Возраст: {{ calculateAge(friend.bdate) }}</p>
        </div>
      </li>
    </ul>
    <p v-if="!friends.length">Загрузка...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      friends: [], // Список друзей
      accessToken:
        "059f1c48059f1c48059f1c489606b89aea0059f059f1c486219d39470f3fb1e3279147e", // Замените на ваш токен
      userId: "52922018", // Замените на ваш ID пользователя
    };
  },
  mounted() {
    this.getFriends();
  },
  methods: {
    async getFriends() {
      try {
        const response = await axios.get(
          "https://api.vk.com/method/friends.get",
          {
            params: {
              user_id: this.userId,
              access_token: this.accessToken,
              v: "5.131",
              fields: "photo_100,bdate",
            },
          }
        );

        // Сохраняем список друзей
        this.friends = response.data.response.items;
      } catch (error) {
        console.error("Ошибка при запросе друзей:", error);
      }
    },
    calculateAge(birthdate) {
      if (!birthdate) return "не указан";
      const [day, month, year] = birthdate.split(".");
      if (!year) return "не указан";
      const birthDate = new Date(year, month - 1, day);
      const ageDiff = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDiff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
  },
};
</script>

<style scoped>
.friend {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.friend img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
