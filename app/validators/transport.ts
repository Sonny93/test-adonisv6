import vine from '@vinejs/vine'

export const connectTransportValidator = vine.compile(
  vine.object({
    dtlsParameters: vine.object({
      fingerprints: vine.array(
        vine.object({
          algorithm: vine.string().trim(),
          value: vine.string().trim(),
        })
      ),
      role: vine.string().trim(),
    }),
  })
)

// export const produceTransportValidator = vine.compile(
//   vine.object({
//     dtlsParameters: vine.object({
//       fingerprints: vine.array(
//         vine.object({
//           algorithm: vine.string().trim(),
//           value: vine.string().trim(),
//         })
//       ),
//       role: vine.string().trim(),
//     }),
//   })
// )
