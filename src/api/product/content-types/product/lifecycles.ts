import slugify from 'slugify';

export default {
  beforeCreate(event: any) {
    const { data } = event.params;
    if (data.name) {
      const slug = slugify(data.name, { lower: true });
      data.slug = slug;
    }
  },
  beforeUpdate(event: any) {
    const { data } = event.params;
    if (data.name) {
      data.slug = slugify(data.name, { lower: true });
    }
  },
};
