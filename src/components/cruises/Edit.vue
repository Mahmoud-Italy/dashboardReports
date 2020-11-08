<template>
    <div class="">
        <Header></Header>

        <!-- Main -->
        <main class="u-main">
            <Navigation></Navigation>

            <div class="u-content">
                <div class="u-body min-h-700">
                    <h1 class="h2 mb-2 text-capitalize">{{ refs }}
                        
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
                            <li class="breadcrumb-item active" aria-current="page">Edit</li>
                        </ol>
                    </nav>
                    <!-- End Breadcrumb -->


        
        <div v-if="pgLoading" class="row h-100">
            <div class="container text-center">
                <div class="spinner-grow mt-5" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>

        <form v-if="!pgLoading" @submit.prevent="editRow" enctype="multipart/form-data" class="h-100">

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
                                            <label for="inputText4">Meta title</label>
                                            <input class="form-control"
                                                    id="inputText4"  
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
                                            <label for="inputText5">Meta keywords</label>
                                            <textarea class="form-control"
                                                    id="inputText5" 
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
                                            <label for="inputText6">Meta description</label>
                                            <textarea class="form-control" 
                                                    id="inputText6" 
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

                    <!-- Card Cruise -->
                    <div class="card mt-5">
                        <div class="card-body">
                            <div id="accordion" class="accordion">
                                <div id="TabCruise" class="card-header">
                                    <h2 class="h4 card-header-title" 
                                        @click="collapseToggle('Cruise')"
                                        aria-expanded="false" 
                                        aria-controls="collapseCruise" 
                                        data-toggle="collapse"
                                        data-target="#collapseCruise">Cruise
                                        <span id="iconToggleCruise" 
                                            class="ti-angle-up u-sidebar-nav-menu__item-arrow 
                                                pull-right black">
                                        </span>
                                    </h2>
                                </div>
                                <div id="collapseCruise" 
                                    class="collapse" 
                                    aria-labelledby="TabCruise" 
                                    data-parent="#accordion">

                                <div class="col-12 pt-3">
                                    
                                    <!-- Title -->
                                    <div class="form-group">
                                        <label for="inputRow1">Title</label>
                                        <input class="form-control" 
                                                id="inputRow1" 
                                                type="text" 
                                                v-model="row.title" 
                                                @keyup="onTitleChange">
                                    </div>
                                    <!-- End Title -->

                                    <!-- Slug -->
                                    <div class="form-group">
                                        <label for="inputRow2">Slug</label>
                                        <input class="form-control text-lowercase"
                                                id="inputRow2"  
                                                type="text" 
                                                v-model="row.slug" 
                                                @keydown.space.prevent 
                                                @paste="onSlugPaste"
                                                @change="onSlugChange(false)">
                                    </div>
                                    <!-- End Slug -->

                                    <!-- Short Title -->
                                    <div class="form-group">
                                        <label for="inputRow3">Short title</label>
                                        <input class="form-control" 
                                                id="inputRow3" 
                                                type="text" 
                                                v-model="row.short_title">
                                    </div>
                                    <!-- End Short Title -->

                                    
                                    <div class="col-12 row no-padding ui-ml-unset">
                                        <!-- Start Price -->
                                        <div class="col-6 no-lpadding">
                                            <div class="form-group">
                                                <label for="inputRow4">Start price</label>
                                                <input class="form-control" 
                                                        id="inputRow4" 
                                                        type="number"
                                                        min="0"
                                                        v-model.number="row.start_price">
                                            </div>
                                        </div>
                                        <!-- End Start Price -->

                                        <!-- Sort -->
                                        <div class="col-6 no-rpadding">
                                            <div class="form-group">
                                                <label for="inputRow5">Sort</label>
                                                <input class="form-control" 
                                                        id="inputRow5" 
                                                        type="number" 
                                                        min="0" 
                                                        v-model.number="row.sort">
                                            </div>
                                        </div>
                                        <!-- End Sort -->
                                    </div>


                                    <!-- Inclusion -->
                                    <div class="form-group">
                                        <label for="iEditor1">Inclusion</label>
                                        <editor
                                            id="iEditor1"
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
                                        <label for="iEditor2">Exclusion</label>
                                        <editor
                                            id="iEditor2"
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


                                    <!-- Facilities -->
                                    <div class="form-group">
                                        <label for="ieditor3">Cruise Facilities</label>
                                        <editor
                                            id="ieditor3"
                                            v-model="row.cruise_facilities"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Facilities -->

                                    <!-- Suite Facilities -->
                                    <div class="form-group">
                                        <label for="iEditor4">Guest Suite Facilities</label>
                                        <editor
                                            id="iEditor4"
                                            v-model="row.guest_suite_facilities"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Suite Facilities -->

                                    <!-- Cabin Facilities -->
                                    <div class="form-group">
                                        <label for="iEditor5">Cabin Facilities</label>
                                        <editor
                                            id="iEditor5"
                                            v-model="row.cabin_facilities"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Cabin Facilities -->

                                    <!-- Cancellation Policies -->
                                    <div class="form-group">
                                        <label for="iEditor6">Cancellation Policies</label>
                                        <editor
                                            id="iEditor6"
                                            v-model="row.cancellation_policies"
                                            :api-key="editor.api_key"
                                            :init="{
                                                height: 300,
                                                menubar: editor.menubar,
                                                plugins: editor.plugins,
                                                toolbar: editor.toolbar
                                            }"
                                        />
                                    </div>
                                    <!-- End Cancellation Policies -->


                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="iEditor7">Short body</label>
                                        <editor
                                            id="iEditor7"
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
                                    <!-- End Body -->

                                    <!-- Body -->
                                    <div class="form-group">
                                        <label for="iEditor8">body</label>
                                        <editor
                                            id="iEditor8"
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
                                                :class="(i == 0) ? 'hidden' : '' "
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
                                                    :class="((prices_items_length[i-1])
                                                             ? x > prices_items_length[i-1]
                                                             : x > 1 )
                                                            ? 'hidden' : ''"
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
                                                :key="i" 
                                                :class="(i == 0) ? 'hidden' : '' "
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

                                                <!-- Itinerarie Sort -->
                                                <div class="form-group">
                                                    <label :for="'iInput2'+i">Sort</label>
                                                    <input class="form-control" 
                                                            :id="'iInput2'+i" 
                                                            type="number" 
                                                            v-model="row.itinerarie_sort[i]">
                                                </div>
                                                <!-- End Itinerarie Sort -->

                                                <!-- Itinerarie Sort -->
                                                <div class="form-group">
                                                    <label :for="'bEditor'+i">Body</label>
                                                    <editor
                                                        :id="'bEditor'+i"
                                                        v-model="row.itinerarie_body[i]"
                                                        :api-key="editor.api_key"
                                                        :init="{
                                                            height: 300,
                                                            menubar: editor.menubar,
                                                            plugins: editor.plugins,
                                                            toolbar: editor.toolbar
                                                        }"
                                                    />
                                                </div>
                                                <!-- End Itinerarie Sort -->

                                                
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
                                        </div>
                                        <!-- End loop -->

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

                    <!-- Nav Cruise Type -->
                    <div class="card">
                        <div class="card-body">
                            <div id="accordionNav" class="accordion">
                                <div id="NavType" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Type')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavType" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavType">Cruise Type
                                            <span id="iconToggleType" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavType" 
                                        class="collapse" 
                                        aria-labelledby="NavType" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Type -->
                                            <div class="form-group">
                                                <div v-if="typeLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <select class="form-control custom-select"
                                                    v-if="!typeLoading" 
                                                    v-model="row.cruise_type_id">
                                                    <option value="">Select Cruise Type</option>
                                                    <option v-for="(type, index) in types" 
                                                            :key="index"
                                                            :value="type.id">
                                                            {{ type.title }}
                                                    </option>
                                                </select>
                                            </div>
                                            <!-- End Type -->
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- End Nav Cruise Type -->


                    <!-- Nav Cruise Cabins -->
                    <div class="card mt-5">
                        <div class="card-body">
                                <div id="accordionNav" class="accordion">
                                    <div id="NavCabins" class="card-header">
                                        <h2 class="h4 card-header-title" 
                                            @click="collapseToggle('Cabins')" 
                                            aria-expanded="false" 
                                            aria-controls="collapseNavCabins" 
                                            data-toggle="collapse" 
                                            data-target="#collapseNavCabins">Multiple Cruise Cabins
                                            <span id="iconToggleCabins" 
                                                    class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
                                            </span>
                                        </h2>
                                    </div>
                                    <div id="collapseNavCabins" 
                                        class="collapse" 
                                        aria-labelledby="NavCabins" 
                                        data-parent="#accordionNav">
                                        <div class="col-12 pt-3">
                                            <!-- Cabins -->
                                            <div class="form-group">
                                                <div v-if="cabinLoading" class="text-center">
                                                    <span class="spinner-grow spinner-grow-sm mr-1" 
                                                        role="status" 
                                                        aria-hidden="true">
                                                    </span>
                                                </div>
                                                <multiselect v-if="!cabinLoading"
                                                    id="multiselect"
                                                    ref="multiselectRef"
                                                    autocomplete="on"
                                                    v-model="row.cabinsValues" 
                                                    :options="cabinsOptions" 
                                                    :multiple="true"
                                                    :close-on-select="false" 
                                                    :clear-on-select="false" 
                                                    :hide-selected="true" 
                                                    :preserve-search="true" 
                                                    :taggable="false"
                                                    placeholder="Type to search cabins"
                                                    :preselect-first="false">
                                                </multiselect>
                                            </div>
                                            <!-- End Cabins -->
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <!-- End Nav Crusie Cabins -->

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
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
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
                                            <div class="form-group">
                                                <label>Image alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_alt">
                                            </div>
                                            <div class="form-group">
                                                <label>Image title</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.image_title">
                                            </div>
                                            <!-- Image -->
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
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
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
                                            <div class="form-group">
                                                <label>Image alt</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.short_image_alt">
                                            </div>
                                            <div class="form-group">
                                                <label>Image title</label>
                                                <input type="text" 
                                                    class="form-control"
                                                    v-model="row.short_image_title">
                                            </div>
                                            <!-- Image -->
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
                                                class="ti-angle-up u-sidebar-nav-menu__item-arrow pull-right black">
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
                                                            ? 'View In Home' : 'Hide In Home'">
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- End View In Home -->
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
                            <span v-if="!btnLoading"> Update Cruise</span>
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
        name: 'Edit',
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

                    // row
                    title: '',
                    slug: '',
                    short_title: '',
                    start_price: '',
                    sort: 0,
                    inclusion: '',
                    exclusion: '',
                    cruise_facilities: '',
                    guest_suite_facilities: '',
                    cabin_facilities: '',
                    cancellation_policies: '',
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
                    itinerarie_body: [],
                    
                    // galleries
                    galleries: [],
                    gallery_key: 0,
                    gallery_image_preview: [],
                    gallery_image_base64: [],
                    gallery_image_alt: [],
                    gallery_image_title: [],

                    // navbar
                    cruise_type_id: '',
                    cabinsValues: [],
                    
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
                },
                editor: {
                    api_key: window.editor_apiKey,
                    menubar: window.editor_menubar,
                    plugins:[window.editor_plugins],
                    toolbar: window.editor_toolbar,
                },
                // cruise types
                types: [],
                typeLoading: true,

                // cabins
                cabinsOptions: [],
                cabinLoading: true,

                // length
                prices_items_length: [],
                itineraries_items_length: [],

                pgLoading: true,
                btnLoading: false,

                // Tenants
                tenant_id: 0,
                tenant_name: '',
                refs: 'cruises'
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

            this.fetchRow();
        },
        methods: {

            // fetch Row
            fetchRow() {
                this.pgLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/'+this.refs+'/'+this.$route.params.id,
                    method: 'GET',
                    data: {},
                    params: {},
                }
                this.axios(options)
                    .then(res => {
                    this.pgLoading = false;

                    // tenant
                    this.tenant_id = res.data.row.tenant_id;
                    this.tenant_name = res.data.row.tenant_name;
                    
                    // meta
                    this.row.meta_title = (res.data.row.meta) ? res.data.row.meta.meta_title : null;
                    this.row.meta_keywords = (res.data.row.meta) ? res.data.row.meta.meta_keywords : null;
                    this.row.meta_description = (res.data.row.meta) ? res.data.row.meta.meta_description : null;

                    // row
                    this.row.slug = res.data.row.slug;
                    this.row.title = res.data.row.title;
                    this.row.short_title = res.data.row.short_title;
                    this.row.start_price = res.data.row.start_price;
                    this.row.sort = res.data.row.sort;
                    this.row.inclusion = res.data.row.inclusion;
                    this.row.exclusion = res.data.row.exclusion;
                    this.row.cruise_facilities = res.data.row.cruise_facilities;
                    this.row.guest_suite_facilities = res.data.row.guest_suite_facilities;
                    this.row.cabin_facilities = res.data.row.cabin_facilities;
                    this.row.cancellation_policies = res.data.row.cancellation_policies;
                    this.row.short_body = res.data.row.short_body;
                    this.row.body = res.data.row.body;

                    // prices
                    this.row.price_key = res.data.row.prices.length;
                    if(res.data.row.prices) {
                        for(let i = 1; i <= this.row.price_key; i++) {
                            let x = i-1;
                            this.row.price_names[i] = res.data.row.prices[x].name;
                            // get items
                            this.prices_items_length[x] = res.data.row.prices[x].items.length;
                            for( let y = 1; y <= res.data.row.prices[x].items.length; y++) {
                                let z = y-1;
                                this.row.price_item_value[i+'_'+y] 
                                        = res.data.row.prices[x].items[z].price_value;
                                this.row.price_item_body[i+'_'+y] 
                                        = res.data.row.prices[x].items[z].body;
                            }
                        }
                    }

                    // itineraries
                    this.row.itinerarie_key = res.data.row.itineraries.length;
                    if(res.data.row.itineraries) {
                        for(let m = 1; m <= this.row.itinerarie_key; m++) {
                            let w = m-1;
                            this.row.itinerarie_names[m] = res.data.row.itineraries[w].title;
                            this.row.itinerarie_sort[m] = res.data.row.itineraries[w].sort;
                            this.row.itinerarie_body[m] = res.data.row.itineraries[w].body;
                            //
                        }
                    }

                    // galleries
                    this.row.gallery_key = res.data.row.galleries.length;
                    if(res.data.row.galleries) {
                        for(let g = 1; g <= this.row.gallery_key; g++) {
                            let q = g-1;
                            this.row.gallery_image_preview[g] = res.data.row.galleries[q].image_url;
                            this.row.gallery_image_base64[g] = res.data.row.galleries[q].image_url;
                            this.row.gallery_image_alt[g] = res.data.row.galleries[q].image_alt;
                            this.row.gallery_image_title[g] = res.data.row.galleries[q].image_title;
                        }
                    }

                    // navbar
                    this.row.cruise_type_id = (res.data.row.cruiseType) ? res.data.row.cruiseType.id : null;
                    this.row.cabinsValues = res.data.row.cabinsValues;


                    // images
                    this.row.image_preview = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_base64 = (res.data.row.image) ? res.data.row.image.image_url : null;
                    this.row.image_alt = (res.data.row.image ) ? res.data.row.image.image_alt : null;
                    this.row.image_title = (res.data.row.image ) ? res.data.row.image.image_title : null;

                    this.row.short_image_preview = (res.data.row.short_image) 
                                                    ? res.data.row.short_image.image_url 
                                                    : null;
                    this.row.short_image_base64 = (res.data.row.short_image) 
                                                    ? res.data.row.short_image.image_url 
                                                    : null;
                    this.row.short_image_alt = (res.data.row.short_image) 
                                                    ? res.data.row.short_image.image_alt 
                                                    : null;
                    this.row.short_image_title = (res.data.row.short_image) 
                                                    ? res.data.row.short_image.image_title 
                                                    : null;

                    // status & visibility
                    this.row.status = res.data.row.status;
                    this.row.view_in_home = res.data.row.view_in_home;

                   
                    this.fetchCruiseTypes(); // call enxt func

                    })
                    .catch((err) => { console.log('=='+err) })
                    .finally(() => {});
            },
            
            // Fetch Regions
            fetchCruiseTypes(){
                this.regionLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/cruisetypes',
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
                        this.typeLoading = false;
                        this.types = res.data.rows;

                        this.fetchCruiseCabins(); // call next func
                    })
                    .catch(() => {})
                    .finally(() => {});
            },


            fetchCruiseCabins() {
                this.cabinLoading = true;
                this.axios.defaults.headers.common = {
                    'X-Requested-With': 'XMLHttpRequest', // security to prevent CSRF attacks
                    'Authorization': `Bearer ` + this.auth.access_token,
                };
                const options = {
                    url: window.baseURL+'/cabins',
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
                        this.cabinLoading = false;
                        this.cabinsOptions = res.data.cabins;
                    })
                    .catch(() => {})
                    .finally(() => {});
            },



            // edit Row
            editRow(){
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
                        this.row.itineraries[i] = {
                            'itinerarie_name' : this.row.itinerarie_names[i],
                            'itinerarie_sort' : this.row.itinerarie_sort[i],
                            'itinerarie_body' : this.row.itinerarie_body[i],
                        }
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
                        url: window.baseURL+'/'+this.refs+'/'+this.$route.params.id,
                        method: 'PUT',
                        data: {
                            tenant_id: this.tenant_id,
                            // meta
                            meta_title: this.row.meta_title,
                            meta_keywords: this.row.meta_keywords,
                            meta_description: this.row.meta_description,

                            // row
                            title: this.row.title,
                            slug: this.row.slug,
                            short_title: this.row.short_title,
                            start_price: this.row.start_price,
                            sort: this.row.sort,                        
                            inclusion: this.row.inclusion,
                            exclusion: this.row.exclusion,
                            cruise_facilities: this.row.cruise_facilities,
                            guest_suite_facilities: this.row.guest_suite_facilities,
                            cabin_facilities: this.row.cabin_facilities,
                            cancellation_policies: this.row.cancellation_policies,
                            short_body: this.row.short_body,
                            body: this.row.body,

                            // price
                            prices: this.row.prices,

                            // itineraries
                            itineraries: this.row.itineraries,

                            // galleries
                            galleries: this.row.galleries,

                            // navbar
                            cruise_type_id: this.row.cruise_type_id,
                            cabins: this.row.cabinsValues,

                            // images
                            image_base64: this.row.image_base64,
                            image_alt: this.row.image_alt,
                            image_title: this.row.image_title,

                            short_image_base64: this.row.short_image_base64,
                            short_image_alt: this.row.short_image_alt,
                            short_image_title: this.row.short_image_title,

                            // status & visibility
                            status: this.row.status,
                            view_in_home: this.row.view_in_home,
                        }
                    }
                    this.axios(options, config)
                        .then(() => {
                            this.btnLoading = false;
                            iziToast.success({
                                icon: 'ti-check',
                                title: 'Great job,',
                                message: 'Item Updated Successfully.',
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


            // items add more
            opnFrm() {
                this.row.price_key++;
                this.row.price_item_key[this.row.price_key] = 0;
                //this.prices_items_length[this.row.price_key - 1] = 0;
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
                this.row.itinerarie_sort[i] = '';
                this.row.itinerarie_body[i] = '';
                //this.row.itinerarie_item_key[i] = '';
                // this.row.itinerarie_key--; // makes issue

                // clear all sub
                // let n = [1,2,3,4,5,6,7,8,9,10];
                // n.forEach(x => {
                //     this.row.itinerarie_item_title[i+'_'+x] = '';
                //     this.row.itinerarie_item_sort[i+'_'+x] = '';
                //     this.row.itinerarie_item_body[i+'_'+x] = '';
                // });
            },
            // opnSub2(i) {
            //     this.row.itinerarie_item_key[i] += 1;
            //     document.querySelector('#sub2_'+i+'_'+this.row.itinerarie_item_key[i]).classList.remove('hidden');
            // },
            // removeSubOption2(i,x) {
            //     document.querySelector('#sub2_'+i+'_'+x).classList.add('hidden');
            //     this.row.itinerarie_item_title[i+'_'+x] = '';
            //     this.row.itinerarie_item_sort[i+'_'+x] = '';
            //     this.row.itinerarie_item_body[i+'_'+x] = '';
            //     this.row.itinerarie_item_key[i] -= 1;
            // },

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

            // Upload Featured image
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
                this.createBase64ShortImage(file)
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

            // remove sessions
            removeLocalStorage() {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_image');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');
                localStorage.removeItem('tenant_id');
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
