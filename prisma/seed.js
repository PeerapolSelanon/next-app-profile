const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient()

async function genPass(pass){
    let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    return await bcrypt.hash(pass, salt);
}

async function main() {

    const permission = await prisma.permission.create({
        data: {
            pages: JSON.stringify({
                dashboard: {view: 1, edit: 1},
                member: {view: 1, edit: 1},
                product: {view: 1, edit: 1},
                order: {view: 1, edit:1},
                transaction: {view: 1, edit:1},
                payment: {}
            }),
            edit_by: 0
        },
      })

      await prisma.role.create({
        data: {
            role_name: 'Member',
            edit_by: 0,
            desciption: 'Sweetdream and unicorn shop member.',
            permission_id: 0
        },
      })

      let role = await prisma.role.create({
        data: {
            role_name: 'Admin',
            edit_by: 0,
            desciption: 'System Admin',
            permission_id: permission.id
        },
      })

    await prisma.user.upsert({
      where: { email: 'apiwat.rata@gmail.com' },
      update: {},
      create: {
        email: 'apiwat.rata@gmail.com',
        name: 'apiwat.rata',
        password: await genPass(process.env.DEFAULT_SEED_PWD),
        role_id: role.id
      },
    })
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })