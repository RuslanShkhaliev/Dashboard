<template>
  <div class="card-settings">
    <form @submit.prevent="saveChanges" class="form" v-if="cardSettings.length">
      <v-accordion :is-opened="!cardIndex && item.isOpen"
                   :key="cardIndex"
                   :title="item.field"
                   @toggle="item.isOpen = $event"
                   style="margin-bottom: 10px"
                   v-for="(item, cardIndex) in cardSettings"
      >
        <v-input v-if="['Name', 'Title'].includes(item.field)" v-model="item.value"/>
        <v-input type="file" v-if="item.field === 'Photo'"/>
        <template v-if="item.field === 'Tags'">
          <select v-model="selectedTag">
            <option disabled style="color: #ccc" value="null">Select a tag</option>
            <option :key="tagIndex"
                    :value="tag"
                    v-for="(tag, tagIndex) of item.value"
            >
              {{tag.Name}}
            </option>
          </select>
          <v-button @click.prevent="createTag(item.value)"
                    size="xs"
                    style="margin-top: 10px;"
                    title="Add+"
                    v-if="item.value.length < 5"
          />
          <transition mode="out-in" name="fade-out">
            <div class="form__tag-preview" v-if="selectedTag">
              <h4 style="margin-bottom: 10px">
                Tag
                <v-close @click="selectedTag = null" relative/>
              </h4>
              <label style="margin-bottom: 10px">
                <h5>Name</h5>
                <v-input v-model="selectedTag.Name"/>
              </label>
              <label>
                <h5>Color</h5>
                <v-input v-model="selectedTag.Color"/>
              </label>
              <div class="form__actions" style="margin-top: 10px">
                <v-button @click="deleteTag(item.value)"
                          btn-style="danger"
                          size="sm"
                          title="Remove"
                />
                <v-button @click="selectedTag = null"
                          size="sm"
                          title="Accept"
                />
              </div>
            </div>
          </transition>
        </template>
      </v-accordion>
      <div class="form__actions">
        <v-button @click="$emit('cancel')"
                  btn-style="secondary"
                  title="Cancel"
        />
        <v-button style="margin-left: 15px" title="Save" type="submit"/>
      </div>
    </form>
  </div>
</template>

<script>
  import VAccordion from "../../../../shared/components/VAccordion";

  const settings_fields = ['Title', 'Name', 'Photo', 'Tags']
  export default {
    name: "CardSettings",
    components: {
      VAccordion,
    },
    props: {
      card: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        selectedTag: null,
        cardClone: JSON.parse(JSON.stringify(this.card)),
        cardSettings: [],
      }
    },
    created() {
      this.prepareCardSettings()
    },
    methods: {
      prepareCardSettings() {
        // !НЕ может быть геттером (в computed).
        // При данной реализации поле isOpen сбрасывается
        // при каждом обновлении
        this.cardSettings =
          Object.entries(this.cardClone)
            .filter(([key,]) => settings_fields.includes(key))
            .map(([field, value], id) => ({field, value, id, isOpen: true}))
      },
      createTag(tags) {
        if (tags.length < 5) {
          const newTag = {Name: `Tag-${tags.length}`, Color: "333"}
          tags.push(newTag)
          if (!this.selectedTag) {
            this.selectedTag = newTag
          }
        }
      },
      deleteTag(tagList) {
        // Тут можно было бы удалять с проверкой только по имени,
        // так как два тега с одним именем не имеют смысла,
        // однако, мы хотим удалять конкретный тег, а не первый совпавший
        const tagIndex = tagList.findIndex(
          item => ((item.Name === this.selectedTag.Name) && (item.Color === this.selectedTag.Color))
        )
        this.selectedTag = null;
        this.$delete(tagList, tagIndex);
      },
      saveChanges() {
        // Easy way to update the card by mutation
        /* this.cardSettings.forEach(item => {
             this.card[item.field] = item.value;
         })*/
        this.cardSettings.forEach(item => {
          this.cardClone[item.field] = item.value
        })
        this.$emit('update-card', this.cardClone)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .card-settings {
    padding-top: 35px;
    .form {
      display: flex;
      flex-direction: column;
      h3 {
        margin-bottom: 4px;
        cursor: pointer;
      }
      select {
        max-width: 280px;
        width: 100%;
        margin-right: 20px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        color: #58606e;
        &:focus {
          border-color: #ffc107;
          outline: none;
        }
      }
      &__tag-preview {
        margin-top: 10px;
        padding: 10px;
        box-shadow: 0 0 2px rgba(#000, .5);
        h4 {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        label {
          display: block;
          &:first-child {
            margin-bottom: 10px;
          }
        }
        .form__actions {
          justify-content: space-between;
        }
      }
      &__actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }

</style>
