<template>
    <div class="item-container">
        <img :src="item.file_paths[0].file" />
        <div class="title">
            <h1>{{ item.title }}</h1>
        </div>
        <div class="information">
            <div class="date">
            <p>{{ item.event.date }}</p>
            </div>
            <div class="reader-count">
            <p>{{ item.reader_count }} pembaca</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object
    },
};
</script>

<style>
.item-container {
  box-sizing: border-box;
  max-width: 220px;
  flex-direction: column;

  img {
    width: 220px;
    height: 158px;
    border-radius: 12px;
    object-fit: cover;
  }

  .title {
    h1 {
      font-weight: 700;
      font-size: 16px;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .information {
    display: flex;
    flex-direction: row;
    gap: 8px;

    font-weight: 400;
    font-size: 12px;

    color: #ffffff;

    .date {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 3px;

      width: 62px;
      height: 22px;

      background: #fed402;
      border-radius: 4px;

      /* Inside auto layout */
      flex: none;
      order: 0;
      flex-grow: 0;

      p {
        font-weight: 400;
        font-size: 12px;
        color: #000000;
        border-radius: 2px;
      }
    }
  }
}
</style>