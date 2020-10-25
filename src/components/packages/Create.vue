<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize"> {{ refs }}
                        
                        <!-- Tenants -->
                        <div class="pull-right ui-mt-15">
                            <span class="btn btn-dark btn-sm">
                                <span class="btn-icon ti-home mr-2"></span>
                                <span> {{ tenant_name }} </span>
                            </span>
                        </div>
                        <!-- End Tenants -->
                        
                    </h1>

                    <!-- Breadcrumb -->
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link :to="{ name: 'dashboard' }">Home</router-link>
                            </li>
                            <li class="breadcrumb-item text-capitalize">
                                <router-link :to="{ name: refs }">{{ refs }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Add New</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


        <form @submit.prevent="addNew" enctype="multipart/form-data" class="h-100">

            <!-- Content -->
            <div class="tab-content">
                <div class="row">      

                
                 <!-- ******* Cards ******* -->  
                <div class="col-md-8 mb-5">

                    <!-- Card Meta -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabMeta" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Meta')"
                                        aria-expanded="false" 
                                        aria-controls="collapseMeta" 
                                        data-toggle="collapse"
                                        data-target="#collapseMeta">Meta
                                        <span id="iconToggleMeta" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseMeta" 
                                    class="collapse show" 
                                    aria-labelledby="TabMeta" 
                                    data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- Meta title -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_title"
                                                v-text="(row.meta_title.length)">
                                            </div>
                                            <label for="metaText1">Meta title</label>
                                            <input class="form-control"
                                                    id="metaText1"  
                                                    type="text" 
                                                    v-model="row.meta_title">
                                        </div>
                                        <!-- End Meta title -->
                                            
                                        <!-- Meta keywords -->
                                        <div class="form-group">
                                            <div class="pull-right f12"
                                                v-if="row.meta_keywords" 
                                                v-text="(row.meta_keywords.length)">
                                            </div>
                                            <label for="metaText2">Meta keywords</label>
                                            <textarea class="form-control"
                                                    id="metaText2" 
                                                    rows="5"  
                                                    v-model="row.meta_keywords">
                                            </textarea>
                                        </div>
                                        <!-- End Meta keywords -->

                                        <!-- Meta description -->
                                        <div class="form-group">
                                            <div class="pull-right f12" 
                                                v-if="row.meta_description" 
                                                v-text="(row.meta_description.length)">
                                            </div>
                                            <label for="metaText3">Meta description</label>
                                            <textarea class="form-control" 
                                                    id="metaText3" 
                                                    rows="5" 
                                                    v-model="row.meta_description">
                                            </textarea>
                                        </div>
                                        <!-- End Meta description -->

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Meta -->

                    <!-- Card Package -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabPackage" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Package')"
                                        aria-expanded="false" 
                                        aria-controls="collapseCruise" 
                                        data-toggle="collapse"
                                        data-target="#collapsePackage">Package
                                        <span id="iconTogglePackage" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapsePackage" 
                                    class="collapse" 
                                    aria-labelledby="TabPackage" 
                                    data-parent="#accordion">

                                    <div class="col-12 pt-3">
                                        
                                        <!-- Title -->
                                        <div class="form-group">
                                            <label for="inputText1">Title</label>
                                            <input class="form-control" 
                                                    id="inputText1" 
                                                    type="text" 
                                                    v-model="row.title" 
                                                    @keyup="onTitleChange">
                                        </div>
                                        <!-- End Title -->

                                        <!-- Slug -->
                                        <div class="form-group">
                                            <label for="inputText2">Slug</label>
                                            <input class="form-control text-lowercase"
                                                    id="inputText2"  
                                                    type="text" 
                                                    v-model="row.slug" 
                                                    @keydown.space.prevent 
                                                    @paste="onSlugPaste"
                                                    @change="onSlugChange(false)">
                                        </div>
                                        <!-- End Slug -->

                                        <!-- Title -->
                                        <div class="form-group">
                                            <label for="inputText3">Short title</label>
                                            <input class="form-control" 
                                                    id="inputText3" 
                                                    type="text" 
                                                    v-model="row.short_title">
                                        </div>
                                        <!-- End Title -->

                                        
                                        <div class="col-12 row no-padding ui-ml-unset">
                                            <!-- Popular -->
                                            <div class="col-8 no-lpadding">
                                                <div class="form-group">
                                                    <label for="inputText4">Popular</label>
                                                    <select class="form-control" 
                                                            id="inputText4" 
                                                            v-model="row.popular">
                                                        <option value="">Select Popular</option>
                                                        <option value="popular">Popular</option>
                                                        <option value="topRated">Top rated</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- End Popular -->

                                            <!-- Start Price -->
                                            <div class="col-4 no-rpadding">
                                                <div class="form-group">
                                                    <label for="inputText5">Start price</label>
                                                    <input class="form-control" 
                                                            id="inputText5" 
                                                            type="number"
                                                            min="0"
                                                            v-model.number="row.start_price">
                                                </div>
                                            </div>
                                            <!-- End Start Price -->

                                            <!-- Stars -->
                                            <div class="col-4 no-lpadding">
                                                <div class="form-group">
                                                    <label for="inputText6">Stars</label>
                                                    <input class="form-control" 
                                                            id="inputText6" 
                                                            type="number"
                                                            min="0" 
                                                            v-model.number="row.stars">
                                                </div>
                                            </div>
                                            <!-- End Stars -->

                                            <!-- Stars No. -->
                                            <div class="col-4">
                                                <div class="form-group">
                                                    <label for="inputText7">Stars No.</label>
                                                    <input class="form-control" 
                                                            id="inputText7" 
                                                            type="number"
                                                            min="0" 
                                                            v-model.number="row.stars_no">
                                                </div>
                                            </div>
                                            <!-- End Stars No. -->

                                            <!-- Sort -->
                                            <div class="col-4 no-rpadding">
                                                <div class="form-group">
                                                    <label for="inputText8">Sort</label>
                                                    <input class="form-control" 
                                                            id="inputText8" 
                                                            type="number"
                                                            min="0" 
                                                            v-model.number="row.sort">
                                                </div>
                                            </div>
                                            <!-- End Sort -->
                                        </div>


                                        <!-- TourType -->
                                        <div class="form-group">
                                            <label for="inputText9">Tour Type</label>
                                            <input class="form-control" 
                                                    id="inputText9" 
                                                    type="text" 
                                                    v-model="row.tour_type">
                                        </div>
                                        <!-- End TourType -->

                                        <!-- Duration -->
                                        <div class="form-group">
                                            <label for="inputText10">Duration</label>
                                            <input class="form-control" 
                                                    id="inputText10" 
                                                    type="text" 
                                                    v-model="row.duration">
                                        </div>
                                        <!-- End Duration -->

                                        <!-- Visited Location -->
                                        <div class="form-group">
                                            <label for="inputEditor1">Visited Location</label>
                                            <editor
                                                id="inputEditor1"
                                                v-model="row.visited_location"
                                                :api-key="editor.api_key"
                                                :init="{
                                                    height: 300,
                                                    menubar: editor.menubar,
                                                    plugins: editor.plugins,
                                                    toolbar: editor.toolbar
                                                }"
                                            />
                                        </div>
                                        <!-- End Visited Location -->

                                        <!-- Inclusion -->
                                        <div class="form-group">
                                            <label for="inputEditor2">Inclusion</label>
                                            <editor
                                                id="inputEditor2"
                                                v-model="row.inclusion"
                                                :api-key="editor.api_key"
                                                :init="{
                                                    height: 300,
                                                    menubar: editor.menubar,
                                                    plugins: editor.plugins,
                                                    toolbar: editor.toolbar
                                                }"
                                            />
                                        </div>
                                        <!-- End Inclusion -->

                                        <!-- Exclusion -->
                                        <div class="form-group">
                                            <label for="inputEditor3">Exclusion</label>
                                            <editor
                                                id="inputEditor3"
                                                v-model="row.exclusion"
                                                :api-key="editor.api_key"
                                                :init="{
                                                    height: 300,
                                                    menubar: editor.menubar,
                                                    plugins: editor.plugins,
                                                    toolbar: editor.toolbar
                                                }"
                                            />
                                        </div>
                                        <!-- End Exclusion -->

                                        <!-- Short Body -->
                                        <div class="form-group">
                                            <label for="inputEditor4">Short body</label>
                                            <editor
                                                id="inputEditor4"
                                                v-model="row.short_body"
                                                :api-key="editor.api_key"
                                                :init="{
                                                    height: 300,
                                                    menubar: editor.menubar,
                                                    plugins: editor.plugins,
                                                    toolbar: editor.toolbar
                                                }"
                                            />
                                        </div>
                                        <!-- End Short Body -->

                                        <!-- Body -->
                                        <div class="form-group">
                                            <label for="inputEditor5">body</label>
                                            <editor
                                                id="inputEditor5"
                                                v-model="row.body"
                                                :api-key="editor.api_key"
                                                :init="{
                                                    height: 600,
                                                    menubar: editor.menubar,
                                                    plugins: editor.plugins,
                                                    toolbar: editor.toolbar
                                                }"
                                            />
                                        </div>
                                        <!-- End Body -->

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Cruise -->

                    <!-- Card Price -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabPrices" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Prices')"
                                        aria-expanded="false" 
                                        aria-controls="collapsePrices" 
                                        data-toggle="collapse"
                                        data-target="#collapsePrices">Prices
                                        <span id="iconTogglePrices" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapsePrices" 
                                    class="collapse" 
                                    aria-labelledby="TabPrices" 
                                    data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                            <!-- For Loop -->
                                            <div v-for="i in row.price_key" 
                                                :key="i" 
                                                :class="(i == 0) ? 'hidden' : ''"
                                                :id="'frm_'+i"
                                                class="ui-for-div">

                                                 <!-- Remove -->
                                                <div class="pull-right ui-mt-10">
                                                    <button v-if="i != 0"
                                                        type="button" 
                                                        class="btn btn-danger btn-circle btn-with-icon btn-sm"
                                                        @click="removeOption(i)">
                                                        <span class="btn-icon ti-close font-bold"></span>
                                                     </button>
                                                </div>
                                                <!-- End Remove -->

                                                <!-- Price Name -->
                                                <div class="form-group">
                                                    <label :for="'iInput'+i">Price Name</label>
                                                    <input class="form-control" 
                                                            :id="'iInput'+i" 
                                                            type="text" 
                                                            v-model="row.price_names[i]">
                                                </div>
                                                <!-- End Price Name -->

                                                
                                                <!-- Price Items -->
                                               <div v-for="x in 10" 
                                                    :key="x" 
                                                    :class="(x != 0) ? 'hidden' : ''"
                                                    :id="'sub_'+i+'_'+x">

                                                    <div class="row col-12 ui-ml-unset">
                                                        <div class="form-group col-1"></div>
                                                        <div class="form-group col-5">
                                                            <label :for="'pvInput'+i+'_'+x">Price Value</label>
                                                            <input class="form-control" 
                                                                    :id="'pvInput'+i+'_'+x" 
                                                                    type="text" 
                                                                    v-model="row.price_item_value[i+'_'+x]">
                                                        </div>
                                                        <div class="form-group col-5">
                                                            <label :for="'pcInput'+i+'_'+x">Content</label>
                                                            <input class="form-control" 
                                                                    :id="'pcInput'+i+'_'+x" 
                                                                    type="text" 
                                                                    v-model="row.price_item_body[i+'_'+x]">
                                                        </div>
                                                        <div class="form-group col-1">
                                                            <button type="button" 
                                                                v-if="x != 0"
                                                                @click="removeSubOption(i,x)"
                                                                class="btn btn-circle btn-with-icon ui-mt30">
                                                                <span class="btn-icon ti-close font-bold"></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Price Items -->

                                                <!-- Price add more -->
                                                <div class="form-group col-1">
                                                    <button type="button" 
                                                        @click="opnSub(i)"
                                                        class="btn btn-secondary btn-circle btn-with-icon ui-mt30 ui-ml-20">
                                                        <span class="btn-icon ti-plus font-bold"></span>
                                                    </button>
                                                </div>
                                                <!-- End Price add more -->
                                            </div>

                                            <!-- Add more -->
                                            <div class="row pull-right">
                                                <button type="button" 
                                                    class="btn btn-dark btn-circle btn-with-icon"
                                                    @click="opnFrm()">
                                                    <span class="btn-icon ti-plus font-bold"></span>
                                                </button>
                                            </div>
                                            <!-- End more -->

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Price -->

                    <!-- Card Itineraries -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabItineraries" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Itineraries')"
                                        aria-expanded="false" 
                                        aria-controls="collapseItineraries" 
                                        data-toggle="collapse"
                                        data-target="#collapseItineraries">Itineraries
                                        <span id="iconToggleItineraries" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseItineraries" 
                                    class="collapse" 
                                    aria-labelledby="TabItineraries" 
                                    data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                            <!-- For Loop -->
                                            <div v-for="i in row.itinerarie_key" 
                                                :key="'i2'+i" 
                                                :class="(i == 0) ? 'hidden' : ''"
                                                :id="'frm2_'+i"
                                                class="ui-for-div">

                                                 <!-- Remove -->
                                                <div class="pull-right ui-mt-10">
                                                    <button v-if="i != 0"
                                                        type="button" 
                                                        class="btn btn-danger btn-circle btn-with-icon btn-sm"
                                                        @click="removeOption2(i)">
                                                        <span class="btn-icon ti-close font-bold"></span>
                                                     </button>
                                                </div>
                                                <!-- End Remove -->

                                                <!-- Itinerarie Name -->
                                                <div class="form-group">
                                                    <label :for="'iInput'+i">Itinerarie Name</label>
                                                    <input class="form-control" 
                                                            :id="'iInput'+i" 
                                                            type="text" 
                                                            v-model="row.itinerarie_names[i]">
                                                </div>
                                                <!-- End Itinerarie Name -->

                                                
                                                <!-- Price Items -->
                                               <div v-for="x in 10" 
                                                    :key="x" 
                                                    :class="(x != 0) ? 'hidden' : ''"
                                                    :id="'sub2_'+i+'_'+x"
                                                    class="ui-for-div">

                                                    <div class="row col-12 ui-ml-unset">
                                                        <div class="form-group col-1"></div>
                                                        <div class="form-group col-7">
                                                            <label :for="'tInput'+i+'_'+x">Title</label>
                                                            <input class="form-control" 
                                                                    :id="'tInput'+i+'_'+x" 
                                                                    type="text" 
                                                                    v-model="row.itinerarie_item_title[i+'_'+x]">
                                                        </div>
                                                        <div class="form-group col-3">
                                                            <label :for="'sInput'+i+'_'+x">Sort</label>
                                                            <input class="form-control" 
                                                                    :id="'sInput'+i+'_'+x" 
                                                                    type="text" 
                                                                    v-model="row.itinerarie_item_sort[i+'_'+x]">
                                                        </div>
                                                        <div class="form-group col-1">
                                                            <button type="button" 
                                                                v-if="x != 0"
                                                                @click="removeSubOption2(i,x)"
                                                                class="btn btn-circle btn-with-icon ui-mt30">
                                                                <span class="btn-icon ti-close font-bold"></span>
                                                            </button>
                                                        </div>
                                                        <div class="form-group col-1"></div>
                                                        <div class="form-group col-11">
                                                            <label :for="'bEditor'+i+'_'+x">Body</label>
                                                            <editor
                                                                :id="'bEditor'+i+'_'+x"
                                                                v-model="row.itinerarie_item_body[i+'_'+x]"
                                                                :api-key="editor.api_key"
                                                                :init="{
                                                                    height: 300,
                                                                    menubar: editor.menubar,
                                                                    plugins: editor.plugins,
                                                                    toolbar: editor.toolbar
                                                                }"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- End Price Items -->

                                                <!-- Price add more -->
                                                <div class="form-group col-1">
                                                    <button type="button" 
                                                        @click="opnSub2(i)"
                                                        class="btn btn-secondary btn-circle btn-with-icon ui-mt30 ui-ml-20">
                                                        <span class="btn-icon ti-plus font-bold"></span>
                                                    </button>
                                                </div>
                                                <!-- End Price add more -->
                                            </div>

                                            <!-- Add more -->
                                            <div class="row pull-right">
                                                <button type="button" 
                                                    class="btn btn-dark btn-circle btn-with-icon"
                                                    @click="opnFrm2()">
                                                    <span class="btn-icon ti-plus font-bold"></span>
                                                </button>
                                            </div>
                                            <!-- End more -->

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Itineraries -->


                    <!-- Card Galeries -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabGalleries" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Galleries')"
                                        aria-expanded="false" 
                                        aria-controls="collapseGalleries" 
                                        data-toggle="collapse"
                                        data-target="#collapseGalleries">Galleries
                                        <span id="iconToggleGalleries" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                            pull-right black">
                                        </span>
                                    </h2>
                                    </div>
                                    <div id="collapseGalleries" 
                                        class="collapse" 
                                        aria-labelledby="TabIGalleries" 
                                        data-parent="#accordion">

                                    <div class="col-12 pt-3">

                                        <!-- For Loop -->
                                        <div v-for="i in row.gallery_key" 
                                            :key="'i3'+i" 
                                            :class="(i == 0) ? 'hidden' : ''"
                                            :id="'frm3_'+i"
                                            class="ui-for-div">

                                             <!--  Remove -->
                                            <div class="pull-right ui-mt-10">
                                                <button v-if="i != 0"
                                                    type="button" 
                                                    class="btn btn-danger btn-circle btn-with-icon btn-sm"
                                                    @click="removeOption3(i)">
                                                    <span class="btn-icon ti-close font-bold"></span>
                                                 </button>
                                            </div>
                                            <!-- End Remove -->

                                            <!-- Itineraries Title -->
                                            <div class="form-group">
                                                <label :for="'gImageText'+i">Image</label>
                                               <p>
                                                    <img v-if="(row.gallery_image_preview[i])" 
                                                        :src="row.gallery_image_preview[i]" 
                                                        class="custom-image">
                                                </p>
                                                <input class="form-control" 
                                                        :id="'gImageText'+i" 
                                                        type="file"
                                                        v-on:change="onGalleryImageChange($event, i)">
                                            </div>
                                            <!-- End Itineraries Title -->

                                            <div class="col-12 row no-padding ui-ml-unset">
                                                <div class="col-6 no-lpadding">
                                                    <div class="form-group">
                                                        <label :for="'gAltText'+i">Image Alt</label>
                                                        <input class="form-control" 
                                                                :id="'gAltText'+i" 
                                                                type="text"
                                                                v-model="row.gallery_image_alt[i]">
                                                    </div>
                                                </div>

                                                <div class="col-6 no-rpadding">
                                                    <div class="form-group">
                                                        <label :for="'gTitleText'+i">Image Title</label>
                                                        <input class="form-control" 
                                                                :id="'gTitleText'+i"
                                                                type="text"
                                                                v-model="row.gallery_image_title[i]">
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End loop -->

                                        </div>

                                            <!-- Add more -->
                                            <div class="row pull-right">
                                                <button type="button" 
                                                    class="btn btn-dark btn-circle btn-with-icon"
                                                    @click="opnFrm3()">
                                                    <span class="btn-icon ti-plus font-bold"></span>
                                                </button>
                                            </div>
                                            <!-- End more -->
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Card Galleries -->

                </div>
                <!-- ******* End Cards ******* -->




                <!-- ******* SideNav ******** -->
                <div class="col-md-4 mb-5">

                    <!-- Nav Destination -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavDestination" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Destination')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavDestination" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavDestination">Destination
                                        <span id="iconToggleDestination" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavDestination" 
                                    class="collapse" 
                                    aria-labelledby="NavDestination" 
                                    data-parent="#accordionNav">

                                    <div class="col-12 pt-3">
                                        <!-- <span v-if="!destinationLoading" 
                                            @click="fetchDestination()"
                                            class="ti-reload pull-right ui-reload">
                                        </span> -->
                                        
                                        <!-- Destinations -->
                                        <div class="form-group">
                                            <div v-if="destinationLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <select class="form-control custom-select"
                                                    v-if="!destinationLoading" 
                                                    v-model="row.destination_id">
                                                    <option value="">Select Destination</option>
                                                    <optgroup v-for="(region, index) in destinations" 
                                                            :key="index"
                                                            :label="region.title">
                                                        <option v-for="(destination,idx) in region.destinations"
                                                            :key="idx"
                                                            :value="destination.id">
                                                            {{ destination.title }}
                                                        </option>
                                                    </optgroup>
                                            </select>
                                        </div>
                                        <!-- End Destination -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Destination -->

                    <!-- Nav Category -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavCategory" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Category')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavCategory" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavCategory">Category
                                        <span id="iconToggleCategory" 
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavCategory" 
                                    class="collapse" 
                                    aria-labelledby="NavCategory" 
                                    data-parent="#accordionNav">
                                    <div class="col-12 pt-3">
                                        <div class="form-group">
                                            <div v-if="categoryLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <select class="form-control custom-select"
                                                v-if="!categoryLoading" 
                                                v-model="row.category_id">
                                                <option value="">Select Category</option>
                                                <option v-for="(category, index) in categories" 
                                                        :key="index"
                                                        :value="category.id">
                                                        {{ category.title }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Category -->


                    <!-- Nav Package Types -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavPackageTypes" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('PackageTypes')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavPackageTypes" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavPackageTypes">Package Types
                                        <span id="iconTogglePackageTypes" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavPackageTypes" 
                                        class="collapse" 
                                        aria-labelledby="NavPackageTypes" 
                                        data-parent="#accordionNav">

                                    <div class="col-12 pt-3">
                                        <div class="form-group">
                                            <div v-if="packageTypesLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <select class="form-control custom-select"
                                                v-if="!packageTypesLoading" 
                                                v-model="row.package_type_id">
                                                <option value="">Select Package Type</option>
                                                <option v-for="(type, index) in packageTypes" 
                                                        :key="index"
                                                        :value="type.id">
                                                        {{ type.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Package Types -->


                    <!-- Nav Multiple Destinations -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavMultipleDestinations" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('MultipleDestinations')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavMultipleDestinations" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavMultipleDestinations">
                                        Multiple Destinations
                                        <span id="iconToggleMultipleDestinations" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavMultipleDestinations" 
                                    class="collapse" 
                                    aria-labelledby="NavMultipleDestinations" 
                                    data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        <div class="form-group">
                                            <div v-if="destinationsLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <multiselect v-if="!destinationsLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="row.destinationsValues" 
                                                    :options="destinationsOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search destinations"
                                                    :preselect-first="false">
                                            </multiselect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Multiple Destinations -->



                    <!-- Nav Multiple Acommodations -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavMultipleAcommodations" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('MultipleAcommodations')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavMultipleAcommodations" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavMultipleAcommodations">
                                        Multiple Acommodations
                                        <span id="iconToggleMultipleAcommodations" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavMultipleAcommodations" 
                                    class="collapse" 
                                    aria-labelledby="NavMultipleAcommodations" 
                                    data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        <div class="form-group">
                                            <div v-if="accommodationsLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <multiselect v-if="!accommodationsLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="row.accommodationsValues" 
                                                    :options="accommodationsOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search accommodations"
                                                    :preselect-first="false">
                                            </multiselect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Multiple Acommodations -->


                    <!-- Nav Multiple Hotels -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavMultipleHotels" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('MultipleHotels')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavMultipleHotels" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavMultipleHotels">
                                        Multiple Hotels
                                        <span id="iconToggleMultipleHotels" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow black pull-right">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavMultipleHotels" 
                                    class="collapse" 
                                    aria-labelledby="NavMultipleHotels" 
                                    data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        <div class="form-group">
                                            <div v-if="hotelsLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <multiselect v-if="!hotelsLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="row.hotelsValues" 
                                                    :options="hotelsOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search hotels"
                                                    :preselect-first="false">
                                            </multiselect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Multiple Hotels -->


                    <!-- Nav Multiple Packages Related -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavMultiplePackagesRelated" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('MultiplePackagesRelated')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavMultiplePackagesRelated" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavMultiplePackagesRelated">
                                        Multiple Packages Related
                                        <span id="iconToggleMultiplePackagesRelated" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow black pull-right">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavMultiplePackagesRelated" 
                                    class="collapse" 
                                    aria-labelledby="NavMultiplePackagesRelated" 
                                    data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        <div class="form-group">
                                            <div v-if="packagesRelatedLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <multiselect v-if="!packagesRelatedLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="row.packagesRelatedValues" 
                                                    :options="packagesRelatedOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search packages related"
                                                    :preselect-first="false">
                                            </multiselect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Multiple Packages Related -->

                    <!-- Nav Multiple Tags -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavMultipleTags" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('MultipleTags')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavMultipleTags" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavMultipleTags">Multiple Tags
                                        <span id="iconToggleMultipleTags" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow black pull-right">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavMultipleTags" 
                                    class="collapse" 
                                    aria-labelledby="NavMultipleTags" 
                                    data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        <div class="form-group">
                                            <div v-if="tagsLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <multiselect v-if="!tagsLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="row.tagsValues" 
                                                    :options="tagsOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search tags"
                                                    :preselect-first="false">
                                            </multiselect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Multiple Tags -->

                    <!-- Nav Multiple Icons -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavMultipleIcons" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('MultipleIcons')" 
                                        aria-expanded="false" 
                                        aria-controls="collapseNavMultipleIcons" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavMultipleIcons">Multiple Icons
                                        <span id="iconToggleMultipleIcons" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow black pull-right">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavMultipleIcons" 
                                    class="collapse" 
                                    aria-labelledby="NavMultipleIcons" 
                                    data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        <div class="form-group">
                                            <div v-if="iconsLoading" class="text-center">
                                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                                    role="status" 
                                                    aria-hidden="true">
                                                </span>
                                            </div>
                                            <multiselect v-if="!iconsLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="row.iconsValues" 
                                                    :options="iconsOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search icons"
                                                    :preselect-first="false">
                                            </multiselect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Multiple Icons -->

                    <!-- Nav Image -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavImage" class="card-header">
                                    <h2 class="h4 card-header-title"
                                        @click="collapseToggle('Image')"  
                                        aria-expanded="false" 
                                        aria-controls="collapseNavImage" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavImage">Featued Image
                                        <span id="iconToggleImage" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow black pull-right">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavImage" 
                                    class="collapse" 
                                    aria-labelledby="NavImage" 
                                    data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        <!-- Image -->
                                        <div class="form-group">
                                            <label>Image</label>
                                            <img :src="row.image_preview" 
                                                class="mb-2 custom-image">
                                            <input type="file" 
                                                class="form-control" 
                                                ref="myDropify" 
                                                v-on:change="onImageChange"
                                                accept="image/*">
                                        </div>
                                        <!-- End Image -->

                                         <!-- Image alt -->
                                        <div class="form-group">
                                            <label>Image alt</label>
                                            <input type="text" 
                                                class="form-control"
                                                v-model="row.image_alt">
                                        </div>
                                        <!-- End Image alt -->
                                        
                                        <!-- Image Title -->
                                        <div class="form-group">
                                            <label>Image title</label>
                                            <input type="text" 
                                                class="form-control"
                                                v-model="row.image_title">
                                        </div>
                                        <!-- End Image title -->
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Image -->

                    <!-- Nav Short Image -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavShortImage" class="card-header">
                                    <h2 class="h4 card-header-title"
                                        @click="collapseToggle('ShortImage')"  
                                        aria-expanded="false" 
                                        aria-controls="collapseNavShortImage" 
                                        data-toggle="collapse" 
                                        data-target="#collapseNavShortImage">Short Image
                                        <span id="iconToggleShortImage" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow black pull-right">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavShortImage" 
                                        class="collapse" 
                                        aria-labelledby="NavShortImage" 
                                        data-parent="#accordionNav">
                                    
                                    <div class="col-12 pt-3">
                                        
                                        <!-- Image -->
                                        <div class="form-group">
                                            <label>Image</label>
                                            <img :src="row.short_image_preview" 
                                                class="mb-2 custom-image">
                                            <input type="file" 
                                                class="form-control" 
                                                ref="myDropify" 
                                                v-on:change="onShortImageChange"
                                                accept="image/*">
                                        </div>
                                        <!-- Image -->

                                        <!-- Image alt -->
                                        <div class="form-group">
                                            <label>Image alt</label>
                                            <input type="text" 
                                                class="form-control"
                                                v-model="row.short_image_alt">
                                        </div>
                                        <!-- End Image alt -->

                                        <!-- Image title -->
                                        <div class="form-group">
                                            <label>Image title</label>
                                            <input type="text" 
                                                class="form-control"
                                                v-model="row.short_image_title">
                                        </div>
                                        <!-- End Image title -->
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Short Image -->

                    <!-- Nav Status -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavStatus" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Status')"
                                        aria-expanded="false" 
                                        aria-controls="collapseNavStatus" 
                                        data-toggle="collapse"
                                        data-target="#collapseNavStatus">Status & Visibility
                                        <span id="iconToggleStatus" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow black pull-right">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseNavStatus" 
                                        class="collapse" 
                                        aria-labelledby="NavStatus" 
                                        data-parent="#accordionNav">
                                        
                                    <div class="col-12 pt-3">
                                        
                                        <!-- Status -->
                                        <div class="form-group">
                                            <div class="custom-control custom-switch mb-2">
                                                <input type="checkbox" 
                                                    class="custom-control-input" 
                                                    id="customSwitch1" 
                                                    :checked="row.status"
                                                    @click="onStatus">
                                                <label class="custom-control-label" 
                                                    for="customSwitch1"
                                                    v-html="(row.status) ? 'Active' : 'Inactive'">
                                                </label>
                                            </div>
                                        </div>
                                        <!-- End Status -->

                                        <!-- View In Home -->
                                        <div class="form-group">
                                            <div class="custom-control custom-switch mb-2">
                                                <input type="checkbox" 
                                                    class="custom-control-input" 
                                                    id="customSwitch2" 
                                                    :checked="row.view_in_home"
                                                    @click="onHome">
                                                <label class="custom-control-label" 
                                                    for="customSwitch2"
                                                    v-html="(row.view_in_home) 
                                                        ? 'Show In Home' : 'Hide In Home'">
                                                </label>
                                            </div>
                                        </div>
                                        <!-- End View In Home -->

                                        <!-- View In Destination Home -->
                                        <div class="form-group">
                                            <div class="custom-control custom-switch mb-2">
                                                <input type="checkbox" 
                                                    class="custom-control-input" 
                                                    id="customSwitch3" 
                                                    :checked="row.view_in_destination_home"
                                                    @click="onDestination">
                                                <label class="custom-control-label" 
                                                    for="customSwitch3"
                                                    v-html="(row.view_in_destination_home) 
                                                        ? 'Show In Destination Home' 
                                                        : 'Hide In Destination Home'">
                                                </label>
                                            </div>
                                        </div>
                                        <!-- End View In Destination Home -->


                                        <!-- Is combined tour -->
                                        <div class="form-group">
                                            <div class="custom-control custom-switch mb-2">
                                                <input type="checkbox" 
                                                    class="custom-control-input" 
                                                    id="customSwitch4" 
                                                    :checked="row.is_combined_tour"
                                                    @click="onCombindTour">
                                                <label class="custom-control-label" 
                                                    for="customSwitch4"
                                                    v-html="(row.is_combined_tour) 
                                                        ? 'Is Combined Tour' 
                                                        : 'Not Combined Tour'">
                                                </label>
                                            </div>
                                        </div>
                                        <!-- End Is combined tour -->



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Nav Status -->

                </div>
                <!-- ******* End SideNav ******** -->


                </div>
            </div>
            <!-- End Content -->

                <!-- Buttons -->
                <div class="col-md-12 row">
                    <div class="form-group mr-2">
                        <button class="btn btn-primary" :disabled="btnLoading">
                            <span v-if="btnLoading">
                                <span class="spinner-grow spinner-grow-sm mr-1" 
                                    role="status" 
                                    aria-hidden="true">
                                </span>Loading...
                            </span>
                            <span v-if="!btnLoading" class="ti-check-box"></span>
                            <span v-if="!btnLoading"> Create Package</span>
                        </button>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-danger" 
                            :disabled="btnLoading" 
                            @click="cancel">
                            <span class="ti-close"></span>
                            <span> Cancel </span>
                        </button>
                    </div>
                </div>
                <!-- End Buttons -->


            </form>
        </div>

                <Footer></Footer>
            </div>
        </main>
        <!-- End Main -->
        
    </div>
</template>

<script>
    import Header from '../layouts/Header.vue';
    import Navigation from '../layouts/Navigation';
    import Footer from '../layouts/Footer.vue';
    import Multiselect from 'vue-multiselect';
    import Editor from '@tinymce/tinymce-vue';
    import iziToast from 'izitoast';

    export default {
        name: 'Create',
        components: {
            Header,
            Navigation,
            Footer,
            Editor,
            Multiselect
        },
        data(){
            return {
                //
                auth: {
                    role: '',
                    access_token: '',
                },
                row: {
                    // meta
                    meta_title: '',
                    meta_keywords: '',
                    meta_description: '',

                    // package
                    slug: '',
                    title: '',
                    short_title: '',
                    popular: '',
                    start_price: '',
                    stars: '',
                    stars_no: '',
                    sort: 0,
                    tour_type: '',
                    duration: '',
                    visited_locations: '',
                    Inclusion: '',
                    exclusion: '',
                    short_body: '',
                    body: '',

                    // prices
                    price_key: 0,
                    prices: [],
                    price_names: [],
                    // items
                    price_items: [],
                    price_item_key: [],
                    price_item_value: [],
                    price_item_body: [],

                    // itineraries
                    itinerarie_key: 0,
                    itineraries: [],
                    itinerarie_names: [],
                    itinerarie_sort: [],
                    // items
                    itinerarie_items: [],
                    itinerarie_item_key: [],
                    itinerarie_item_title: [],
                    itinerarie_item_sort: [],
                    itinerarie_item_body: [],

                    // galleries
                    galleries: [],
                    gallery_key: 0,
                    gallery_image_preview: [],
                    gallery_image_base64: [],
                    gallery_image_alt: [],
                    gallery_image_title: [],

                    // destination
                    destination_id: '',

                    // category
                    category_id: '',

                    // packageType
                    package_type_id: '',

                    // multiple destinations
                    destinationsValues: [],

                    // multiple accommodations
                    accommodationsValues: [],

                    // multiple hotels
                    hotelsValues: [],

                    // multiple package related
                    packages_relatedValues: [],

                    // multiple tags
                    tagsValues: [],

                    // multiple icons
                    iconsValues: [],

                    // image
                    image_preview: '',
                    image_base64: '',
                    image_alt: '',
                    image_title: '',

                    // short image
                    short_image_preview: '',
                    short_image_base64: '',
                    short_image_alt: '',
                    short_image_title: '',

                    // status & visibility
                    status: 1,
                    view_in_home: 0,
                    view_in_destination_home: 0,
                    is_combined_tour: 0
                },
                editor: {
                    api_key: window.editor_apiKey,
                    menubar: window.editor_menubar,
                    plugins:[window.editor_plugins],
                    toolbar: window.editor_toolbar,
                },

                // destinations
                destinations: [],
                destinationLoading: true,

                // category
                categories: [],
                categoryLoading: true,

                // packageTypes
                packageTypes: [],
                packageTypesLoading: true,

                // multiple destinations
                destinationsOptions: [],
                destinationsLoading: true,

                // multiple accommodations
                accommodationsOptions: [],
                accommodationsLoading: true,

                // multiple hotels
                hotelsOptions: [],
                hotelsLoading: true,

                // multiple packageRelated
                packagesRelatedOptions: [],
                packagesRelatedLoading: true,

                // multiple tags
                tagsOptions: [],
                tagsLoading: true,

                // multiple icons
                iconsOptions: [],
                iconsLoading: true,

                // btn
                pgLoading: false,
                btnLoading: false,

                // Tenants
                tenant_id: 0,
                tenant_name: '',
                refs: 'packages'
            }
        },
        mounted() {},
        computed: {},
        created() {
            // AccessToken & Role
            if(localStorage.getItem('role')) {
                this.auth.role = localStorage.getItem('role');
            }
            if(localStorage.getItem('access_token')) {
                this.auth.access_token = localStorage.getItem('access_token');
            }

            // Tenants
            if(localStorage.getItem('tenant_id')) {
                this.tenant_id = localStorage.getItem('tenant_id');
            }
            if(localStorage.getItem('tenant_name')) {
                this.tenant_name = localStorage.getItem('tenant_name');
            }

            // call destinations func
            this.fetchDestination();
        },
        methods: {
            
            // fetchDestination
            fetchDestination() {
                this.destinationLoading = true;
                this.destinationsLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/regions',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.destinationLoading = false;
                    this.destinations = res.data.rows;
                    
                    this.fetchCategories(); // call next function
                })
                .catch(() => {})
                .finally(() => {});
            },

            // fetchCategories
            fetchCategories() {
                this.categoryLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/categories',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.categoryLoading = false;
                    this.categories = res.data.rows;
                    
                    this.fetchPackageTypes(); // call next function
                })
                .catch(() => {})
                .finally(() => {});
            },

            // fetchPackageTypes
            fetchPackageTypes(){
                this.packageTypesLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/packagetypes',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.packageTypesLoading = false;
                    this.packageTypes = res.data.rows;

                    this.fetchMultipleDestinations(); // call next function
                })
                .catch(() => {})
                .finally(() => {});
            },

            fetchMultipleDestinations() {
                this.destinationsLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/destinations',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.destinationsLoading = false;
                    this.destinationsOptions = res.data.destinations;
                    
                    this.fetchMultipleAccommodations(); // call next function
                })
                .catch(() => {})
                .finally(() => {});
            },

            // fetchMultipleAccommodations
            fetchMultipleAccommodations(){
                this.accommodationsLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/accommodations',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.accommodationsLoading = false;
                    this.accommodationsOptions = res.data.accommodations;

                    this.fetchMultipleHotels(); // call next function
                })
                .catch(() => {})
                .finally(() => {});
            },

            // fetchMultipleAccommodations
            fetchMultipleHotels(){
                this.hotelsLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/hotels',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.hotelsLoading = false;
                    this.hotelsOptions = res.data.hotels;

                    this.fetchMultiplePackagesRelated(); // call next function
                })
                .catch(() => {})
                .finally(() => {});
            },

            // fetchMultiplePackagesRelated
            fetchMultiplePackagesRelated(){
                this.packagesRelatedLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/packages',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.packagesRelatedLoading = false;
                    this.packagesRelatedOptions = res.data.packages;

                    this.fetchMultipleTags(); // call next function
                })
                .catch(() => {})
                .finally(() => {});
            },

            // fetchMultipleTags
            fetchMultipleTags(){
                this.tagsLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/tags',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.tagsLoading = false;
                    this.tagsOptions = res.data.tags;

                    this.fetchMultipleIcons(); // call next function
                })
                .catch(() => {})
                .finally(() => {});
            },

            // fetchMultipleIcons
            fetchMultipleIcons(){
                this.iconsLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/icons',
                    method: 'GET',
                    data: {},
                    params: {
                        tenant_id: this.tenant_id,
                        status: 'active',
                        paginate: 100,
                    },
                }
                this.axios(options)
                .then(res => {
                    this.iconsLoading = false;
                    this.iconsOptions = res.data.icons;
                    //
                })
                .catch(() => {})
                .finally(() => {});
            },



            


            // Add New
            addNew(){
                if(this.tenant_id == 0) {
                    
                    iziToast.warning({
                        icon: 'ti-alert',
                        title: 'Wow-man,',
                        message: 'No tenany selected.'
                    });

                } else {
                    this.btnLoading = true;
                    this.axios.defaults.headers.common = {
                        'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                        'Authorization': `Bearer ` + this.auth.access_token,
                    };

                    // prices
                    for( let i = 1; i < this.row.price_names.length; i++ ) {
                            for( let x = 1; x <= 10; x++) {
                            let item_value = this.row.price_item_value[i+'_'+x];
                            let item_body  = this.row.price_item_body[i+'_'+x];
                            if(item_value) {
                                this.row.price_items[x] = {
                                    'item_value' : item_value,
                                    'item_body'  : item_body
                                }
                            }
                        }
                        this.row.prices[i] = {
                            'price_name' : this.row.price_names[i],
                            'items'      : this.row.price_items
                        }
                        this.row.price_items = []; // clear array
                    }

                    // itineraries
                    for( let i = 1; i < this.row.itinerarie_names.length; i++ ) {
                            for( let x = 1; x <= 10; x++) {
                            let item_title = this.row.itinerarie_item_title[i+'_'+x];
                            let item_sort  = this.row.itinerarie_item_sort[i+'_'+x];
                            let item_body  = this.row.itinerarie_item_body[i+'_'+x];
                            if(item_title) {
                                this.row.itinerarie_items[x] = {
                                    'item_title' : item_title,
                                    'item_sort' : item_sort,
                                    'item_body' : item_body
                                }
                            }
                        }
                        this.row.itineraries[i] = {
                            'itinerarie_name' : this.row.itinerarie_names[i],
                            'itinerarie_sort' : this.row.itinerarie_sort[i],
                            'items' : this.row.itinerarie_items
                        }
                        this.row.itinerarie_items = []; // clear array
                    }

                    // galleries
                    for( let i = 1; i < this.row.gallery_image_base64.length; i++ ) {
                        this.row.galleries[i] = {
                            'gallery_image_base64' : this.row.gallery_image_base64[i],
                            'gallery_image_alt' : this.row.gallery_image_alt[i],
                            'gallery_image_title' : this.row.gallery_image_title[i]
                        }
                    }

                    const config = { headers: { 'Content-Type': 'multipart/form-data' }};  
                    const options = {
                        url: window.baseURL+'/'+this.refs,
                        method: 'POST',
                        data: {
                            tenant_id: this.tenant_id,
                            // meta
                            meta_title: this.row.meta_title,
                            meta_keywords: this.row.meta_keywords,
                            meta_description: this.row.meta_description,

                            // package
                            title: this.row.title,
                            slug: this.row.slug,
                            short_title: this.row.short_title,
                            popular: this.row.popular,
                            start_price: this.row.start_price,
                            stars: this.row.stars,
                            stars_no: this.row.stars_no,
                            sort: this.row.sort,
                            tour_type: this.row.tour_type,
                            duration: this.row.duration,
                            visited_locations: this.row.visited_locations,
                            inclusion: this.row.inclusion,
                            exclusion: this.row.exclusion,
                            short_body: this.row.short_body,
                            body: this.row.body,

                            // prices
                            prices: this.row.prices,

                            // itineraries
                            itineraries: this.row.itineraries,

                            // galleries
                            galleries: this.row.galleries,

                            // navbar
                            destination_id: this.row.destination_id,
                            category_id: this.row.category_id,
                            package_type_id: this.row.package_type_id,
                            destinations: this.row.destinationsValues,
                            accommodations: this.row.accommodationsValues,
                            hotels: this.row.hotelsValues,
                            packagesRelated: this.row.packagesRelatedValues,
                            tags: this.row.tagsValues,
                            icons: this.row.iconsValues,

                            // image
                            image_base64: this.row.image_base64,
                            image_alt: this.row.image_alt,
                            image_title: this.row.image_title,

                            // short image
                            short_image_base64: this.row.short_image_base64,
                            short_image_alt: this.row.short_image_alt,
                            short_image_title: this.row.short_image_title,

                            // status & visibility
                            status: this.row.status,
                            view_in_home: this.row.view_in_home,
                            view_in_destination_home: this.row.view_in_destination_home,
                            is_combined_tour: this.row.is_combined_tour
                        }
                    }
                    this.axios(options, config)
                        .then(() => {
                            this.btnLoading = false;
                            iziToast.success({
                                icon: 'ti-check',
                                title: 'Great job,',
                                message: 'Item Added Successfully.',
                            });
                            this.$router.push({ name: this.refs });
                        })
                        .catch(err => {
                            // 403 Forbidden
                            if(err.response && err.response.status == 401) {
                                this.removeLocalStorage();
                                this.$router.push({ name: 'login' });
                            } else if(err.response && err.response.status == 403) {
                                this.$router.push({ name: 'forbidden' });
                            } else {
                                this.btnLoading = false;
                                iziToast.warning({
                                    icon: 'ti-alert',
                                    title: 'Wow-man,',
                                    message: err.response.data.message
                                });
                            }
                        })
                        .finally(() => {})
                }
            },

            // remove localStorage
            removeLocalStorage() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_image');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');
                localStorage.removeItem('tenant_id');
            },

            // items add more
            opnFrm() {
                this.row.price_key++;
                this.row.price_item_key[this.row.price_key] = 0;
            },
            removeOption(i) {
                document.querySelector('#frm_'+i).remove();
                this.row.price_names[i] = '';
                this.row.price_item_key[i] = '';
                // this.row.price_key--; // makes issue

                // clear all sub
                let n = [1,2,3,4,5,6,7,8,9,10];
                n.forEach(x => {
                    this.row.price_item_value[i+'_'+x] = '';
                    this.row.price_item_body[i+'_'+x] = '';
                });
            },
            opnSub(i) {
                this.row.price_item_key[i] += 1;
                document.querySelector('#sub_'+i+'_'+this.row.price_item_key[i]).classList.remove('hidden');
            },
            removeSubOption(i,x) {
                document.querySelector('#sub_'+i+'_'+x).classList.add('hidden');
                this.row.price_item_value[i+'_'+x] = '';
                this.row.price_item_body[i+'_'+x] = '';
                this.row.price_item_key[i] -= 1;
            },

            // itineraries add more
            opnFrm2() {
                this.row.itinerarie_key++;
                this.row.itinerarie_item_key[this.row.itinerarie_key] = 0;
            },
            removeOption2(i) {
                document.querySelector('#frm2_'+i).remove();
                this.row.itinerarie_names[i] = '';
                this.row.itinerarie_item_key[i] = '';
                // this.row.itinerarie_key--; // makes issue

                // clear all sub
                let n = [1,2,3,4,5,6,7,8,9,10];
                n.forEach(x => {
                    this.row.itinerarie_item_title[i+'_'+x] = '';
                    this.row.itinerarie_item_sort[i+'_'+x] = '';
                    this.row.itinerarie_item_body[i+'_'+x] = '';
                });
            },
            opnSub2(i) {
                this.row.itinerarie_item_key[i] += 1;
                document.querySelector('#sub2_'+i+'_'+this.row.itinerarie_item_key[i]).classList.remove('hidden');
            },
            removeSubOption2(i,x) {
                document.querySelector('#sub2_'+i+'_'+x).classList.add('hidden');
                this.row.itinerarie_item_title[i+'_'+x] = '';
                this.row.itinerarie_item_sort[i+'_'+x] = '';
                this.row.itinerarie_item_body[i+'_'+x] = '';
                this.row.itinerarie_item_key[i] -= 1;
            },

            // items3 add more
            opnFrm3() {
                this.row.gallery_key++;
            },
            removeOption3(i) {
                document.querySelector('#frm3_'+i).remove();
                this.row.gallery_image_preview[i] = '';
                this.row.gallery_image_base64[i] = '';
                this.row.gallery_image_alt[i] = '';
                this.row.gallery_image_title[i] = '';
            },


            // Title
            onTitleChange() {
                this.onSlugChange(this.row.title);
            },

            // on Paste
            onSlugPaste(){
                let str = this.row.slug;
                this.onSlugChange(str);
            },
            onSlugChange(str=''){
                if(!str) {
                    str = this.row.slug;
                }
                this.row.slug = str.replace(/\s+/g, '-');
            },


            // Upload images
            onGalleryImageChange(e, i){
                const file = e.target.files[0];
                this.row.gallery_image_preview[i] = URL.createObjectURL(file);
                this.createBase64Gallery(file, i);
            },
            createBase64Gallery(fileObject, i){
                const reader = new FileReader();
                reader.readAsDataURL(fileObject);
                reader.onload = e =>{
                    this.row.gallery_image_base64[i] = e.target.result;
                };
            },
            onImageChange(e){
                const file = e.target.files[0];
                this.row.image_preview = URL.createObjectURL(file);
                this.createBase64Image(file);
            },
            createBase64Image(fileObject){
                const reader = new FileReader();
                reader.readAsDataURL(fileObject);
                reader.onload = e =>{
                    this.row.image_base64 = e.target.result;
                };
            },
            onShortImageChange(e){
                const file = e.target.files[0];
                this.row.short_image_preview = URL.createObjectURL(file);
                this.createBase64ShortImage(file);
            },
            createBase64ShortImage(fileObject){
                const reader = new FileReader();
                reader.readAsDataURL(fileObject);
                reader.onload = e =>{
                    this.row.short_image_base64 = e.target.result;
                };
            },

            // active status
            onStatus(){
                if(this.row.status)
                    this.row.status = 0;
                else
                    this.row.status = 1;
            },
            onHome(){
                if(this.row.view_in_home)
                    this.row.view_in_home = 0;
                else
                    this.row.view_in_home = 1;
            },
            onDestination(){
                if(this.row.view_in_destination_home)
                    this.row.view_in_destination_home = 0;
                else
                    this.row.view_in_destination_home = 1;
            },
            onCombindTour(){
                if(this.row.is_combined_tour)
                    this.row.is_combined_tour = 0;
                else
                    this.row.is_combined_tour = 1;
            },


            // toggleCollapse
            collapseToggle(div) {
                let el = document.querySelector("span#iconToggle"+div);
                if(el.classList.contains('ti-angle-down')) {
                    el.classList.remove('ti-angle-down');
                    el.classList.add('ti-angle-up');
                } else {
                    el.classList.remove('ti-angle-up');
                    el.classList.add('ti-angle-down');
                }
            },

            // Cancel
            cancel(){
                if(confirm('Are You Sure?')) {
                    this.$router.push({ name: this.refs });
                }
            },

        },
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
