export default {
  name: 'tournament',
  title: 'Tournament',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Como será o link do torneio: /t/{slug}',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cgs',
      title: 'CGS ',
      type: 'string',
      description: 'Para obter os dados do torneio. O ID no url do CGS. https://cgs.gg/tournament/{CGS}',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().lowercase(),
    },
    {
      name: 'action',
      title: 'Call to action',
      description: 'Botão que aparece no topo de um torneio',
      type: 'object',
      fields: [
        {
          title: 'Title',
          type: 'string',
          name: 'title',
          description: 'Exemplo: Inscrição, Em direto!, ...',
        },
        {
          title: 'Link',
          type: 'url',
          name: 'href',
          description: 'https://www.twitch.tv/...',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Style',
          type: 'string',
          name: 'style',
          options: {
            list: [{ title: 'Default', value: '' }, { title: 'Primary', value: 'success' }, { title: 'Warning', value: 'warning' }, { title: 'Danger', value: 'danger' }],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'teams',
      title: 'Teams',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            title: 'Slot', name: 'slot', type: 'number', validation: (Rule) => Rule.required().positive().integer(),
          },
          {
            title: 'Team',
            name: 'team',
            type: 'reference',
            to: { type: 'team' },
            validation: (Rule) => Rule.required(),
          },
        ],
      }],
      validator: (Rule) => Rule.unique(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'startsAt',
      title: 'Start date',
      type: 'datetime',
    },
    {
      name: 'endsAt',
      title: 'End date',
      type: 'datetime',
    },
    {
      name: 'information',
      title: 'Extra information',
      type: 'blockContent',
    },
    {
      title: 'Refetch toggle',
      name: 'refetch',
      description: 'Ao mudar este valor irá ser feito um pedido ao cgs para atualizar os dados em tempo real.',
      type: 'boolean',
    },
  ],
  initialValue: {
    action: {
      _type: 'object',
      title: 'Ver Stream',
      style: 'success',
      href: 'https://www.twitch.com/shootsgud',
    },
    refetch: false,
  },
};
