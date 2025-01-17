<template>
  <div>
    <h1>Список друзей</h1>
    <ul>
      <li v-for="friend in friends" :key="friend.id">
        <img :src="friend.photo_100" alt="Фото друга" />
        <p>{{ friend.first_name }} {{ friend.last_name }}</p>
      </li>
    </ul>
    <p v-if="!friends.length && !loading">Друзей не найдено</p>
    <p v-if="loading">Загрузка...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      friends: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchFriends();
  },
  methods: {
    async fetchFriends() {
      const token = localStorage.getItem("vk_token");
      if (!token) {
        this.$router.push("/"); // Если токен отсутствует, перенаправляем на главную
        return;
      }

      try {
        const response = await axios.get(
          "https://api.vk.com/method/friends.get",
          {
            params: {
              access_token: token,
              v: "5.131",
              fields: "photo_100",
            },
          }
        );
        this.friends = response.data.response.items;
      } catch (error) {
        console.error("Ошибка загрузки списка друзей:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
