import { isUniqueOtherThanLanguage } from '../lib/isUniqueOtherThanLanguage'

export const book = {
  name: 'book',
  title: 'Books',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: isUniqueOtherThanLanguage
      }
    },
    { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'labels', title: 'Labels', type: 'array', of: [{ type: 'string' }] },
    { name: 'ageGroup', title: 'Age Group', type: 'string', options: { list: ['Children', 'Teens', 'Adults'] } },
    { name: 'badges', title: 'Badges', type: 'array', of: [{ type: 'string' }] },
    { name: 'shortTagline', title: 'Short Tagline', type: 'text' },
    { name: 'publishedYear', title: 'Published Year', type: 'number' },
    { name: 'isFeatured', title: 'Is Featured', type: 'boolean' },
    { name: 'price', title: 'Price', type: 'number' },
    {
      name: 'deliveryMode',
      title: 'Delivery Mode',
      type: 'string',
      initialValue: 'physical',
      options: {
        list: [
          { title: 'Physical', value: 'physical' },
          { title: 'Digital', value: 'digital' }
        ]
      }
    },
    {
      name: 'downloadUrl',
      title: 'Digital Download URL',
      type: 'url',
      hidden: ({ document }: { document?: { deliveryMode?: string } }) => document?.deliveryMode !== 'digital'
    },
    { name: 'language', type: 'string', readOnly: true, hidden: true }
  ],
}
