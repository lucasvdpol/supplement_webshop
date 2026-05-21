package com.example.webshopbackend2.utils;

import com.example.webshopbackend2.dao.CategoryRepository;
import com.example.webshopbackend2.dao.ProductRepository;
import com.example.webshopbackend2.dao.UserRepository;
import com.example.webshopbackend2.models.Category;
import com.example.webshopbackend2.models.CustomUser;
import com.example.webshopbackend2.models.Product;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Seeder {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    public Seeder(ProductRepository productRepository, CategoryRepository categoryRepository, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event){
        this.seedProducts();
    }

    private void seedProducts(){
        String encodedPassword = this.passwordEncoder.encode("test123");
        CustomUser user = new CustomUser("test@mail.com", encodedPassword, "ROLE_ADMIN");
        this.userRepository.save(user);
        Category category1 = new Category("Proteïne Poeder");
        Category category2 = new Category("Pre-workout");
        Category category3 = new Category("Ashwagandha");
        Category category4 = new Category("Magnesium");
        Category category5 = new Category("Vitamines");
        Category category6 = new Category("Creatine");
        this.categoryRepository.save(category1);
        this.categoryRepository.save(category2);
        this.categoryRepository.save(category3);
        this.categoryRepository.save(category4);
        this.categoryRepository.save(category5);
        this.categoryRepository.save(category6);
        Product product1 = new Product(category1, "Blackberry", "ESN", 49.90, "proteineblackberry.webp", 1000, false,
                "Whey eiwitisolaat 96%, aroma, zuurteregelaar (citroenzuur), zoetstof (sucralose, acesulfaam K), " +
                        "kleurstof (anthocyanen (bevat sulfieten)). Oorsprongingrediënten: EU/Niet-EU.", 908, 25);
        Product product2 = new Product(category1, "Dark Cookies & Cream", "ESN", 37.90, "proteinecookies.webp", 1000, false,
                "Wei-eiwitmengsel 85 % (ultragefilterd wei-eiwitconcentraat, microgefilterd wei-eiwitisolaat), " +
                        "cacaopoeder 6 % (sterk ontvet), aroma, stukjes koekjes 3 % (tarwemeel, suiker, palmvet, " +
                        "cacaopoeder (sterk ontvet), rĳsmiddelen (ammoniumwaterstofcarbonaat, natriumwaterstofcarbonaat, " +
                        "kaliumcarbonaat), zout), emulgator (lecithinen (zonnebloem, soja*)), zout, zoetstoffen " +
                        "(sucralose, steviolglycosiden uit Stevia), anti- klontermiddel (siliciumdioxide). " +
                        "Oorsprong ingrediënten: EU/Niet-EU.", 908, 22);
        Product product3 = new Product(category1, "Almond Coconut", "ESN", 37.90, "proteinecoconut.webp", 1000, false,
                "Whey protein blend 94 % (ultra-gefilterd wey eiwitconcentraat, cross-flow micro-gefilterd whey eiwit " +
                        "isolaat), aroma, emulgator (lecithines (zonnebloem, soybean*)), geraspte kokosnoot 1,5%, zout, " +
                        "zoetstoffen (sucralose, steviolglycosiden uit stevia). Oorsprongingrediënten: EU/Niet-EU.", 908, 22);
        Product product4 = new Product(category1, "Vanilla", "ESN", 24.90, "proteinevanilla.webp", 1000, false,
                "Wei-eiwitconcentraat 90 %, cacaopoeder (sterk ontvet) 4 %, aroma, emulgator (lecithinen (zonnebloem, " +
                        "soja*)), zout, antiklontermiddel (siliciumdioxide), zoetstoffen (sucralose, steviolglycosiden " +
                        "uit Stevia). Oorsprong ingrediënten: EU/Niet-EU.", 1000, 22);
        Product product5 = new Product(category1, "Chocolate", "ESN", 24.90, "proteinechocolate.webp", 1000, false,
                "Wei-eiwitconcentraat 90 %, cacaopoeder (sterk ontvet) 4 %, aroma, emulgator (lecithinen (zonnebloem, " +
                        "soja*)), zout, antiklontermiddel (siliciumdioxide), zoetstoffen (sucralose, steviolglycosiden " +
                        "uit Stevia). Oorsprong ingrediënten: EU/Niet-EU.", 1000, 22);
        Product product6 = new Product(category1, "Banana Milk", "ESN", 49.90, "protein-bananamilk.webp", 1000, false,
                "Wei-eiwitisolaat 96 %, emulgator (lecithinen (zonnebloem, soja²)), aroma, zout, " +
                        "antiklontermiddel (siliciumdioxide), kleurstof (carotenen), zoetstoffen (sucralose, " +
                        "steviol-glycosiden uit Stevia). Oorsprong ingrediënten: EU/Niet-EU. *Afhankelijk van de beschikbaarheid." +
                        "uit Stevia). Oorsprong ingrediënten: EU/Niet-EU.", 908, 25);
        Product product7 = new Product(category2, "Energy", "ABE", 24.79, "preworkout-energy.png", 1000, false,
                "L-citrulline malaat, creatine monohydraat, bèta-alanine, voedingszuur (citroenzuur), aroma, " +
                        "zuurteregelaar (natriumwaterstofcarbonaat), taurine, watervrije cafeïne, " +
                        "cholinebitartraat (VitaCholine™), antiklontermiddelen (siliciumdioxide, " +
                        "calciumsilicaat), zoetstof (sucralose), nicotinamide (vit. B3), kleurstoffen " +
                        "(ammoniakkaramel, tartrazine), cyanocobalamine (vit. B12)", 375, 0);
        Product product8 = new Product(category2, "Fruit Punch", "Body&Fit", 19.99, "preworkout-fruitpunch.webp", 1000, false,
                "Cafeïne, Glucuronolactone, Chilipoeder extract, Groene thee extract, Taurine, N-Acetyl Tyrosine, " +
                        "Chromium Picolinate, Magnesium, Choline bitartrate, Vitamine B2, Vitamine B3, Biotine, " +
                        "Vitamine B12", 225, 0);
        Product product9 = new Product(category2, "Blue Ice", "Body&Fit", 29.99, "preworkout-pump.webp", 1000, false,
                "L-citrulline malaat, Creatine monohydraat, Arginine alpha-ketoglutaraat, Bèta-alanine, Glycerolblend, " +
                        "L-tyrosine, Cholinebitartraat, AstraGin™, Vitamine B3, Vitamine B12", 340, 0);
        Product product10 = new Product(category3,  "KSM-66", "Body&fit", 17.49, "ashwagandhabody&fit.webp", 1000, false,
                "Ashwagandha KSM-66® (Withania somnifera (L.) Dunal) (melk), capsule (hydroxypropylmethylcellulose), " +
                        "vulstof (microkristallijne cellulose), antiklontermiddel (siliciumdioxide), stabilisator " +
                        "(magnesiumzouten van vetzuren)", 360, 0);
        Product product11 = new Product(category3,  "KSM-66", "Applied Nutrition", 16.29, "ashwagandhaappliec-nutrition.webp", 1000, false,
                "ashwagandha KSM-66® (Withania somnifera (L.) Dunal), plantaardige capsule (hydroxypropylmethylcellulose)",
                480, 0);
        Product product12 = new Product(category4,  "Citrate", "Body&Fit", 22.49, "magnesiumbody&fit.webp", 1000, false,
                "magnesiumcitraat, capsule (gelatine (rund)), antiklontermiddel (magnesiumzouten van vetzuren), maltodextrine",
                240, 0);
        Product product13 = new Product(category5,  "Multi+Omega-3", "Body&Fit", 22.49, "vitaminesbody&fit.webp", 1000, false,
                "omega-3 visolie, capsule (gelatine (rund), bevochtigingsmiddelen (glycerol, sorbitolen), " +
                        "water, kleurstoffen (ijzeroxiden en ijzerhydroxiden)), magnesiumoxide, L-ascorbinezuur (vit. C), " +
                        "verdikkingsmiddel (bijenwas), ijzersulfaat, D-alfa-tocoferol (vit. E), nicotinamide (vit. B3), " +
                        "emulgator (sojalecithine), zinkoxide, calcium-D-pantothenaat (vit. B5), mangaansulfaat, " +
                        "cyanocobalamine (vit. B12), kopersulfaat, retinylpalmitaat (vit. A), pyridoxinehydrochloride " +
                        "(vit. B6), riboflavine (vit. B2), thiaminemononitraat (vit. B1), cholecalciferol (vit. D3), " +
                        "pteroylmonoglutaminezuur (foliumzuur), natriumselenaat, fytomenadion (vit. K), D-biotine",
                240, 0);
        Product product14 = new Product(category5,  "Athlete Stack: Women", "ESN", 29.90, "vitamineswomen-esn.webp", 1000, false,
                "(retinylacetaat, ß-caroteen), vitamine B2(riboflavine), chroompicolinaat, foliumzuur " +
                        "(6S-5-methyltetrahydrofoliumzuur, glucosaminezout),kaliumjodide, natriumseleniet, biotine " +
                        "(D-biotine), vitamine D (cholecalciferol), vitamine K (menaquinon-7), vitamine B12 " +
                        "(methylcobalamine, 5'-deoxyadenosylcobalamine, hydroxocobalamine)], capsulehuls(glansmiddel " +
                        "(hydroxypropylmethylcellulose)). ",
                60, 0);
        Product product15 = new Product(category5,  "Athlete Stack: Men", "ESN", 29.90, "vitaminesmen-esn.webp", 1000, false,
                "Vitaminen- en mineralenmix 84 % (calciumcitraat, magnesiumcitraat, kaliumcitraat, vitamine E " +
                        "(gemengde tocoferolen), vitamine C (ascorbinezuur), ĳzerbisglycinaat, zinkbisglycinaat, " +
                        "antiklontermiddelen (magnesiumstearaat, siliciumdioxide), niacine (nicotinamide), foliumzuur " +
                        "(pteroylmonoglutaminezuur), pantotheenzuur(calcium-D-pantothenaat), L-selenomethionine, " +
                        "vitamine D (D3/cholecalciferol), mangaanbisglycinaat,biotine (D-biotine), vitamine B6 " +
                        "(pyridoxinehydrochloride), chroompicolinaat, natriumseleniet, thiamine (thiaminemononitraat), " +
                        "riboflavine (vitamine B2), vitamine K (K2/menaquinon-7), vitamine A (retinylacetaat), " +
                        "koperbisglycinaat, vitamine A (bètacaroteen), kaliumjodide, vitamine B12(methylcobalamine, " +
                        "adenosylcobalamine, hydroxocobalamineacetaat)), capsule omhulsel (hydroxypropylmethylcellulose). ",
                60, 0);

        Product product16= new Product(category2, "Tropical Punch", "ESN", 32.90, "preworkout-esn-tropical.webp", 1000, false,
                "L-citrullinemalaat (2:1), L-arginine alfa-ketoglutaraat (2.:1), dextrine, taurine, L-glycine, " +
                        "L-tyrosine, aroma, zuurteregelaar (citroenzuur), glucuronolacton, druivenpitextract, " +
                        "groene thee-extract, cafeïne, schizandra-extract, zoetstoffen (sucralose, acesulfaam K), " +
                        "antiklontermiddel (magnesiumzouten van vetzuren), Rhodiola rosea-extract, ginsengwortelextract, " +
                        "bittere sinaasappelextract, kleurstof (caroteen), zwarte paprika-extract.", 380, 0);

        Product product17= new Product(category2, "Blue Raspberry", "ESN", 39.90, "preworkout-esn-blueraspberry.webp", 1000, false,
                "L-citrullinemalaat (2:1), dextrine, L-arginine alfa-ketoglutaraat (2:1), aroma, glycerolpoeder " +
                        "(HydroPrime), elektrolytenmengsel 6,5 % (trinatriumcitraatdihydraat, kaliumcitraat, calciumcitraat, " +
                        "magnesiumcitraat), taurine, L-tyrosine, voedingszuur (citroenzuur), L-glycine, kleurstof (spirulina " +
                        "concentraat), glucuronolacton, adenosine 5'-trifosfaat dinatrium (ATP) (als PEAK ATP®), extract " +
                        "van bittere sinaasappelschil, antiklontermiddel (siliciumdioxide), guarana-extract, rhodiola " +
                        "rosea-extract, extrakt van groene thee, citicoline, druivenpitextract, cafeïne, schisandra-extract, " +
                        "ginsengwortelextract, zoetstoffen(sucralose, steviolglycosiden uit Stevia), ginkgo biloba-bladextract, " +
                        "extract van zwarte peper.", 360, 0);

        Product product18 = new Product(category6, "Ultrapure", "ESN", 29.90, "creatine-esn.webp", 1000, false,
                "creatinemonohydraat", 500, 0);

        Product product19 = new Product(category6, "Creapure", "Bulk", 39.49, "bulkcreatine.webp", 1000, false,
                "Creatine-monohydraat (Creapure®)", 500, 0);
        Product product20 = new Product(category6, "Monohydrate", "Body&Fit", 9.99, "body&fitcreatine.webp", 1000, false,
                "creatine monohydraat(100%)", 500, 0);

        this.productRepository.save(product1);
        this.productRepository.save(product2);
        this.productRepository.save(product3);
        this.productRepository.save(product4);
        this.productRepository.save(product5);
        this.productRepository.save(product6);
        this.productRepository.save(product7);
        this.productRepository.save(product8);
        this.productRepository.save(product9);
        this.productRepository.save(product10);
        this.productRepository.save(product11);
        this.productRepository.save(product12);
        this.productRepository.save(product13);
        this.productRepository.save(product14);
        this.productRepository.save(product15);
        this.productRepository.save(product16);
        this.productRepository.save(product17);
        this.productRepository.save(product18);
        this.productRepository.save(product19);
        this.productRepository.save(product20);

    }
}
