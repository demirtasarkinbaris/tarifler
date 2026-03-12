import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Delete existing data
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Hamur İşi',
        slug: 'hamur-isi',
        description: 'Ekmek, pasta ve diğer hamur işleri'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Tatlı',
        slug: 'tatli',
        description: 'Şerbetli tatlılar, pastalar ve kremalı tatlılar'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Pilav',
        slug: 'pilav',
        description: 'Çeşitli pilav çeşitleri'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Çorba',
        slug: 'corba',
        description: 'Sıcak ve lezzetli çorbalar'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Ana Yemek',
        slug: 'ana-yemek',
        description: 'Başlıca yemek seçenekleri'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Salata',
        slug: 'salata',
        description: 'Taze ve sağlıklı salatalar'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Kahvaltılık',
        slug: 'kahvaltilk',
        description: 'Sabah kahvaltısı seçenekleri'
      }
    }),
    prisma.category.create({
      data: {
        name: 'İçecek',
        slug: 'icecek',
        description: 'Sıcak ve soğuk içecekler'
      }
    })
  ]);

  console.log(`Created ${categories.length} categories`);

  // Create example recipes
  const recipe1 = await prisma.recipe.create({
    data: {
      title: 'Evde Ekmek Tarifi',
      slug: 'evde-ekmek-tarifi',
      description: 'İçinde ve dışında harika lezzet olan, evi ekmek kokusuna boğan, tarifi çok basit ev ekmeği. Bu tarif ile yumuşacık, arası boş, üstü sarı ev ekmeği yapabilirsiniz.',
      instructions: `Öncelikle mayayı çözdürmekle işe başlayalım. Bunun için ılık suya maya ve şekeri ekleyerek karıştıralım. Benim şuan kullandığım maya aktif kuru maya olduğu için çok fazla bekletmeyeceğim. Normal maya kullanacaksanız 8-10 dakika arası mayanın aktifleşmesi için bekletirseniz yeterli. Eğer instant maya kullanacaksanız bekletmenize gerek yok, yaş mayayı da aynı şekilde çözdürerek kullanabilirsiniz.
Yoğurma kabına unu alalım, üzerine tuzu ekleyerek ortasını çukurlaştıralım. Çözdürdüğümüz mayayı çukura boşaltalım, hamuru yoğurmaya başlayalım. Ne kadar yumuşak cıvık kıvamlı bir hamur hazırlarsanız ekmekleriniz de o kadar yumuşak olur. Hamur yumuşak olduğu için elinize yapışacaktır. Bunu önlemek için elimizi hafifçe ıslatarak hamuru toparlayalım.
Daha sonra hamurun üzerini kapatalım ve üstünü bir bezle kapatarak 40 dakika kadar mayalanmaya bırakalım. Ortam ne kadar sıcak olursa hamurda o kadar hızlı mayalancaktır.
Mayası gelen hamurun üzerini açalım, yine elimizi hafifçe ıslatarak hamurun havasını alalım.
Ardından hamuru un serptiğimiz tezgaha boşaltalım. Elimizle yoğurarak hamuru toparlayalım.
Daha sonra hamuru 8 eşit parçaya keselim. Keserken yine hamurun yapışmaması için kestiğimiz bıçağı ıslatmak da fayda var.
Böldüğümüz hamurları bezeler haline getirelim ve bu aşamada elimize ve tezgaha yapışmaması için bol bol unlayalım.
Fırın tepsisine pişirme kağıdını yerleştirelim, bu sayede tepsiyi yağlamaya veya unlamaya gerek kalmayacaktır.
Bezeleri elimizle yuvarlayarak kenarları daha ince olacak şekilde rulo haline getirelim. Dilerseniz rulo yapmadan daire şeklinde de pişirebilirsiniz ama ben mink minik ekmeklere benzemeleri için bu şekilde hazırladım.
Şekillendirdiğimiz hamurları fırın tepsisine yerleştirelim, tepsi mayasının gelmesi için üzerlerine nemli bir bezi örterek 15-20 dakika bekletelim. Üzerlerini bu şekilde örtmezseniz hamurların üzerleri kuruyup çatlayacaktır. O yüzden mutlaka üzerlerini nemli bir bez ile örtün.
Tepsi mayası gelen hamurların üzerlerini açalım ve bir fırça yardımı ile çırpılmış yoğurdu hamurların üzerlerine tek tek sürelim. Bu sayede ekmeklerin üzeri nar gibi kızaracaktır.
Yoğurt kullanmak istemezseniz yine bir fırça ile üzerlerine su sürebilirsiniz. Eğer ekmeklerin üzerlerinin taş fırın ekmeği gibi olmasını isterseniz de un serpebilirsiniz.
Son olarak eskin bir bıçak le üzerlerine kesikler atalım. İstediğiniz şekilde yandan ya da ortadan kesikler atabilirsiniz.
Ekmekleri önceden 230°C de ısıttığımız fırında yaklaşık 20-25 dakika pişmeye bırakalım.
Bu arada özellikle belirtmek istediğim bir püf noktası var, fırını ısıtmaya başlamadan önce mutlaka fırının tabanına ısıya dayanıklı bir kap içerisine su koymayı unutmayın. Su buharı ekmeklerinizin yumuşacık pişmesi için çok önemli.
Üstü ve altı nar gibi kızaran yumuşacık ev yapımı ekmeklerimiz hazır. İlk sıcağı çıktıktan sonra dilediğiniz şekilde tüketebilirsiniz.`,
      youtubeUrl: 'https://www.youtube.com/watch?v=EqTf1sUGWTA&t=1s',
      categoryId: categories[0].id,
      ingredients: {
        create: [
          { name: 'Kuru maya', amount: '2 yemek kaşığı' },
          { name: 'Toz şeker', amount: '1 yemek kaşığı' },
          { name: 'Ilık su', amount: '1,5-2 su bardağı (350 ml)' },
          { name: 'Un', amount: '4 su bardağı (500g)' },
          { name: 'Tuz', amount: '2 tatlı kaşığı (silme)' },
          { name: 'Yoğurt', amount: 'Üzeri için' }
        ]
      }
    }
  });

  const recipe2 = await prisma.recipe.create({
    data: {
      title: 'Baklava',
      slug: 'baklava',
      description: 'Geleneksel Türk tatlısı baklavayı evde yapın. Katmanlı yufka, fıstık ve şerbetiyle lezzet bombası.',
      instructions: 'Fırını 180°C ön ısıtın.\nBir tepsiye tereyağı yağlayın.\nYufka katmanlarını yerleştirin ve her katmanın arası fıstık koyun.\nBaklavaları ince ince dilimleyin.\nÖncesinde hazırlanan şerbeti dökün.\n30-35 dakika altın sarısı olana kadar pişirin.',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      categoryId: categories[1].id,
      ingredients: {
        create: [
          { name: 'Yufka', amount: '500 g' },
          { name: 'Fıstık (öğütülmüş)', amount: '300 g' },
          { name: 'Tereyağı', amount: '200 g' },
          { name: 'Şurup', amount: '400 ml' }
        ]
      }
    }
  });

  const recipe3 = await prisma.recipe.create({
    data: {
      title: 'Pilav',
      slug: 'pilav',
      description: 'Klasik, lezzetli Türk pilavı. Her yemeğin yanındaki mükemmel eşlik.',
      instructions: 'Tereyağında şehriye kavrulur.\nPirinç eklenir ve 2 dakika kavrulur.\nSıcak su veya et suyu ilave edilir.\nTuz ve karabiber eklenip karıştırılır.\nKaynama sonrası ateş azaltılır.\nÖrtüyle 20 dakika pişirilir.',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      categoryId: categories[2].id,
      ingredients: {
        create: [
          { name: 'Pirinç', amount: '2 su bardağı' },
          { name: 'Tereyağı', amount: '4 yemek kaşığı' },
          { name: 'Şehriye', amount: '1 yemek kaşığı' },
          { name: 'Su', amount: '4 su bardağı' },
          { name: 'Tuz', amount: 'Tatlı kaşığı 1' }
        ]
      }
    }
  });

  const recipe4 = await prisma.recipe.create({
    data: {
      title: 'Salçalı Bulgur Pilavı',
      slug: 'salcali-bulgur-pilavi',
      description: 'Salçalı ve lezzetli bulgur pilavı. Domates ve biber salçasıyla hazırlanan pratik ve beslenmeye değer bir yemek.',
      instructions: `Tencereye tereyağı ve sıvı yağı alalım.
Tereyağı eridikten sonra domates salçası ve biber salçasını ekleyerek kavuralım.
Üzerine yıkanmış pilavlık bulguru ilave ederek karıştıralım.
Yeteri kadar tuz ve sıcak suyu da ilave ederek tekrar karıştıralım.
Tencerenin kapağını kapatarak kısık ateşte bulgurlar suyunu çekene kadar pişirelim.
Pişen pilavımızın üzerine kağıt havlu kapatarak yaklaşık 10 dakika dinlendirelim.
Daha sonra pilavımız servise hazır.`,
      youtubeUrl: 'https://www.youtube.com/watch?v=MCEhWAwIFqo',
      categoryId: categories[2].id,
      ingredients: {
        create: [
          { name: 'Tereyağı', amount: '2 yemek kaşığı' },
          { name: 'Sıvı yağ', amount: '3 yemek kaşığı' },
          { name: 'Domates salçası', amount: '1 yemek kaşığı' },
          { name: 'Biber salçası', amount: 'Yarım yemek kaşığı' },
          { name: 'Bulgur', amount: '1,5 su bardağı' },
          { name: 'Tuz', amount: 'Tatlandırılacak' },
          { name: 'Sıcak su', amount: '3,5 su bardağı' }
        ]
      }
    }
  });

  console.log('Seeded database with example recipes');
  console.log('Created recipes:', [recipe1.id, recipe2.id, recipe3.id, recipe4.id]);
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
